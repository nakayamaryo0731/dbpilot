//! AI-related types

use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../src/types/generated/")]
pub enum AiProvider {
    Claude,
    Ollama,
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../src/types/generated/")]
pub struct GenerateSqlRequest {
    pub prompt: String,
    pub schema_context: String,
    pub provider: AiProvider,
    #[ts(optional)]
    pub api_key: Option<String>,
    #[ts(optional)]
    pub ollama_base_url: Option<String>,
    #[ts(optional)]
    pub ollama_model: Option<String>,
}
