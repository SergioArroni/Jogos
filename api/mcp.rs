// Vercel function /api/mcp: wraps the MCP router (mcp/lib.rs) for Vercel's Rust runtime.
use std::sync::Arc;

use el_baul_mcp::{Supabase, allowed_hosts, router};
use tower::ServiceBuilder;
use vercel_runtime::{Error, axum::VercelLayer};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let app = ServiceBuilder::new()
        .layer(VercelLayer::new())
        .service(router(Arc::new(Supabase::from_env()), allowed_hosts()));
    vercel_runtime::run(app).await
}
