//! MCP server for El Baúl de los Jogos.
//!
//! Each request carries the user's own Supabase session token. The tools call
//! Supabase's REST API *with that token*, so the same RLS rules that protect the
//! app decide what each person can see; nothing about permissions lives here.
//!
//! The server is stateless (no sessions in memory) because every request on
//! Vercel may land on a different instance.

use std::sync::Arc;

use axum::{
    Json, Router,
    extract::Request,
    http::{StatusCode, header, request::Parts},
    middleware::{self, Next},
    response::{IntoResponse, Response},
};
use rmcp::{
    ErrorData as McpError, RoleServer, ServerHandler,
    handler::server::wrapper::Parameters,
    model::*,
    schemars,
    service::RequestContext,
    tool, tool_handler, tool_router,
    transport::streamable_http_server::{
        StreamableHttpServerConfig, StreamableHttpService, session::never::NeverSessionManager,
    },
};
use serde::{Deserialize, de::DeserializeOwned};

// Public values (the same ones the web app ships); env vars can override them.
const DEFAULT_SUPABASE_URL: &str = "https://ibllpkczcsjxqzszwiby.supabase.co";
const DEFAULT_PUBLISHABLE_KEY: &str = "sb_publishable_Q1uBq8AgBRhSLRfYIqW7lA_zhwj6KeR";
const PRODUCTION_HOST: &str = "el-baul-de-los-jogos.vercel.app";

/// Talks to Supabase's REST and Auth APIs on behalf of the caller.
pub struct Supabase {
    url: String,
    key: String,
    http: reqwest::Client,
}

impl Supabase {
    pub fn new(url: impl Into<String>, key: impl Into<String>) -> Self {
        Self { url: url.into().trim_end_matches('/').to_owned(), key: key.into(), http: reqwest::Client::new() }
    }

    pub fn from_env() -> Self {
        Self::new(
            std::env::var("SUPABASE_URL").unwrap_or_else(|_| DEFAULT_SUPABASE_URL.into()),
            std::env::var("SUPABASE_PUBLISHABLE_KEY").unwrap_or_else(|_| DEFAULT_PUBLISHABLE_KEY.into()),
        )
    }

    async fn get<T: DeserializeOwned>(&self, path: &str, token: &str) -> Result<T, String> {
        let response = self
            .http
            .get(format!("{}{path}", self.url))
            .header("apikey", &self.key)
            .bearer_auth(token)
            .send()
            .await
            .map_err(|_| "No se pudo conectar con El Baúl. Inténtalo de nuevo en un momento.".to_owned())?;
        match response.status() {
            status if status.is_success() => {
                response.json().await.map_err(|_| "El Baúl devolvió una respuesta inesperada.".to_owned())
            }
            reqwest::StatusCode::UNAUTHORIZED | reqwest::StatusCode::FORBIDDEN => {
                Err("Tu sesión de El Baúl no es válida o ha caducado. Vuelve a conectar la cuenta.".to_owned())
            }
            status => Err(format!("El Baúl respondió con un error ({status}).")),
        }
    }
}

/// A game as the app stores it (JSON in the `data` column).
#[derive(Debug, Clone, Default, Deserialize, PartialEq)]
#[serde(default)]
pub struct Game {
    pub name: String,
    pub players: String,
    pub types: Vec<String>,
    pub weight: Option<f64>,
    pub duration: Option<f64>,
    pub location: String,
    pub notes: String,
}

#[derive(Deserialize)]
struct Row<T> {
    data: T,
}

#[derive(Deserialize)]
struct AuthUser {
    id: String,
    email: Option<String>,
}

#[derive(Deserialize)]
struct Profile {
    nickname: String,
}

/// Games whose name, styles or notes contain `search` (ignoring case), sorted by name.
pub fn filter_games(mut games: Vec<Game>, search: Option<&str>) -> Vec<Game> {
    if let Some(search) = search.map(|s| s.trim().to_lowercase()).filter(|s| !s.is_empty()) {
        games.retain(|game| {
            format!("{} {} {}", game.name, game.types.join(" "), game.notes).to_lowercase().contains(&search)
        });
    }
    games.sort_by_key(|game| game.name.to_lowercase());
    games
}

/// One line per game, readable for a person and easy for a model to quote.
pub fn format_games(games: &[Game]) -> String {
    if games.is_empty() {
        return "No hay juegos que coincidan.".to_owned();
    }
    let lines: Vec<String> = games
        .iter()
        .map(|game| {
            let mut facts = Vec::new();
            if !game.players.is_empty() {
                facts.push(format!("{} jugadores", game.players));
            }
            if let Some(minutes) = game.duration {
                facts.push(format!("{minutes} min"));
            }
            if let Some(weight) = game.weight {
                facts.push(format!("dureza {weight}/5"));
            }
            if !game.types.is_empty() {
                facts.push(game.types.join(", "));
            }
            if !game.location.is_empty() {
                facts.push(format!("en {}", game.location));
            }
            let facts = if facts.is_empty() { String::new() } else { format!(" ({})", facts.join("; ")) };
            let notes = if game.notes.is_empty() { String::new() } else { format!(" — {}", game.notes) };
            format!("- {}{facts}{notes}", game.name)
        })
        .collect();
    let count = if games.len() == 1 { "1 juego".to_owned() } else { format!("{} juegos", games.len()) };
    format!("{count}:\n{}", lines.join("\n"))
}

fn bearer(parts: &Parts) -> Option<&str> {
    parts.headers.get(header::AUTHORIZATION)?.to_str().ok()?.strip_prefix("Bearer ").filter(|t| !t.is_empty())
}

fn caller_token(ctx: &RequestContext<RoleServer>) -> Result<String, McpError> {
    ctx.extensions
        .get::<Parts>()
        .and_then(bearer)
        .map(str::to_owned)
        .ok_or_else(|| McpError::invalid_request("Falta la sesión de El Baúl.", None))
}

fn text_result(result: Result<String, String>) -> CallToolResult {
    match result {
        Ok(text) => CallToolResult::success(vec![ContentBlock::text(text)]),
        Err(message) => CallToolResult::error(vec![ContentBlock::text(message)]),
    }
}

#[derive(Debug, Deserialize, schemars::JsonSchema)]
pub struct ListGamesParams {
    /// Texto opcional para filtrar por nombre, estilo o notas (por ejemplo "cooperativo").
    #[serde(default)]
    pub search: Option<String>,
}

#[derive(Clone)]
pub struct Baul {
    supabase: Arc<Supabase>,
}

#[tool_router]
impl Baul {
    pub fn new(supabase: Arc<Supabase>) -> Self {
        Self { supabase }
    }

    #[tool(description = "Dice con qué cuenta de El Baúl de los Jogos está conectado el usuario (apodo y correo).")]
    async fn who_am_i(&self, ctx: RequestContext<RoleServer>) -> Result<CallToolResult, McpError> {
        let token = caller_token(&ctx)?;
        let result = async {
            let user: AuthUser = self.supabase.get("/auth/v1/user", &token).await?;
            let profiles: Vec<Profile> =
                self.supabase.get(&format!("/rest/v1/profiles?select=nickname&user_id=eq.{}", user.id), &token).await?;
            let nickname = profiles.into_iter().next().map(|p| p.nickname).unwrap_or_else(|| "(sin apodo)".into());
            Ok(format!("Conectado como @{nickname} ({}).", user.email.unwrap_or_default()))
        }
        .await;
        Ok(text_result(result))
    }

    #[tool(description = "Lista los juegos de mesa de la colección del usuario en El Baúl de los Jogos, con jugadores, duración, dureza (1-5), estilos, lugar y notas. Acepta un texto para filtrar.")]
    async fn list_games(
        &self,
        Parameters(params): Parameters<ListGamesParams>,
        ctx: RequestContext<RoleServer>,
    ) -> Result<CallToolResult, McpError> {
        let token = caller_token(&ctx)?;
        let result = self
            .supabase
            .get::<Vec<Row<Game>>>("/rest/v1/games?select=data", &token)
            .await
            .map(|rows| format_games(&filter_games(rows.into_iter().map(|row| row.data).collect(), params.search.as_deref())));
        Ok(text_result(result))
    }
}

#[tool_handler]
impl ServerHandler for Baul {
    fn get_info(&self) -> ServerConfig {
        ServerConfig::new(ServerCapabilities::builder().enable_tools().build())
            .with_server_info(
                Implementation::new("el-baul-de-los-jogos", env!("CARGO_PKG_VERSION"))
                    .with_title("El Baúl de los Jogos")
                    .with_description("Tu colección de juegos de mesa, partidas y grupos."),
            )
            .with_instructions(
                "Herramientas de El Baúl de los Jogos, la colección de juegos de mesa del usuario. \
                 Usa list_games para saber qué juegos tiene antes de recomendar nada."
                    .to_owned(),
            )
    }
}

/// Hostnames this deployment answers to. rmcp rejects other `Host` headers to
/// prevent DNS rebinding, so Vercel's own URLs are added from its system variables.
pub fn allowed_hosts() -> Vec<String> {
    let mut hosts: Vec<String> = [PRODUCTION_HOST, "localhost", "127.0.0.1"].map(String::from).to_vec();
    for var in ["VERCEL_URL", "VERCEL_BRANCH_URL", "VERCEL_PROJECT_PRODUCTION_URL"] {
        if let Ok(host) = std::env::var(var) {
            hosts.push(host);
        }
    }
    hosts
}

/// Without a token there is nothing to show: answer 401 so MCP clients know they must sign in.
async fn require_bearer(request: Request, next: Next) -> Response {
    let (parts, body) = request.into_parts();
    if bearer(&parts).is_none() {
        return (
            StatusCode::UNAUTHORIZED,
            [(header::WWW_AUTHENTICATE, "Bearer")],
            Json(serde_json::json!({ "error": "Conecta tu cuenta de El Baúl de los Jogos." })),
        )
            .into_response();
    }
    next.run(Request::from_parts(parts, body)).await
}

/// The whole MCP endpoint: stateless Streamable HTTP with plain JSON replies.
pub fn router(supabase: Arc<Supabase>, hosts: Vec<String>) -> Router {
    let config = StreamableHttpServerConfig::default()
        .with_legacy_session_mode(false)
        .with_json_response(true)
        .with_allowed_hosts(hosts);
    let service = StreamableHttpService::new(
        move || Ok(Baul::new(supabase.clone())),
        NeverSessionManager::default().into(),
        config,
    );
    Router::new().fallback_service(service).layer(middleware::from_fn(require_bearer))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn game(name: &str, types: &[&str]) -> Game {
        Game { name: name.into(), types: types.iter().map(|t| t.to_string()).collect(), ..Default::default() }
    }

    #[test]
    fn filters_by_name_style_or_notes_ignoring_case() {
        let games = vec![game("Zombis", &["Fiesta"]), game("Agricola", &["Estrategia"]), game("Magic Maze", &["Cooperativo"])];
        let names = |list: Vec<Game>| list.into_iter().map(|g| g.name).collect::<Vec<_>>();
        assert_eq!(names(filter_games(games.clone(), Some("COOPERATIVO"))), ["Magic Maze"]);
        assert_eq!(names(filter_games(games.clone(), Some("  "))), ["Agricola", "Magic Maze", "Zombis"]);
        assert_eq!(names(filter_games(games, None)).len(), 3);
    }

    #[test]
    fn formats_each_game_with_its_facts() {
        let catan = Game {
            name: "Catan".into(),
            players: "3–4".into(),
            duration: Some(90.0),
            weight: Some(2.0),
            types: vec!["Estrategia".into()],
            location: "Casa Sergio".into(),
            notes: "Con expansión".into(),
        };
        assert_eq!(
            format_games(&[catan]),
            "1 juego:\n- Catan (3–4 jugadores; 90 min; dureza 2/5; Estrategia; en Casa Sergio) — Con expansión"
        );
        assert_eq!(format_games(&[]), "No hay juegos que coincidan.");
        assert_eq!(format_games(&[game("Trio", &[]), game("Uno", &[])]), "2 juegos:\n- Trio\n- Uno");
    }

    #[test]
    fn reads_only_bearer_tokens() {
        let parts = |value: &str| {
            let (parts, _) = axum::http::Request::builder().header("authorization", value).body(()).unwrap().into_parts();
            parts
        };
        assert_eq!(bearer(&parts("Bearer abc")), Some("abc"));
        assert_eq!(bearer(&parts("Basic abc")), None);
        assert_eq!(bearer(&parts("Bearer ")), None);
    }

    #[test]
    fn missing_fields_in_stored_games_use_defaults() {
        let parsed: Game = serde_json::from_str(r#"{"name":"Trio","weight":null}"#).unwrap();
        assert_eq!(parsed, game("Trio", &[]));
    }
}
