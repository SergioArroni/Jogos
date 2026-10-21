// Local MCP server for development and tests:
//   cargo run --example local
// SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY choose the backend (tests point it at the Docker stack).
use std::sync::Arc;

use el_baul_mcp::{Supabase, router};

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let address = std::env::var("MCP_ADDRESS").unwrap_or_else(|_| "127.0.0.1:8791".into());
    let port = address.rsplit(':').next().unwrap_or("8791").to_owned();
    let hosts = ["localhost", "127.0.0.1"].iter().flat_map(|h| [h.to_string(), format!("{h}:{port}")]).collect();
    let listener = tokio::net::TcpListener::bind(&address).await?;
    println!("MCP de El Baúl escuchando en http://{address}/mcp");
    axum::serve(listener, router(Arc::new(Supabase::from_env()), hosts)).await
}
