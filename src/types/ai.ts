// Re-export generated types from ts-rs
export type { AiProvider, GenerateSqlRequest } from "./generated";

// Frontend-only type (not in Rust, stored in localStorage)
export interface AiSettings {
  provider: "Claude" | "Ollama";
  claudeApiKey: string;
  ollamaBaseUrl: string;
  ollamaModel: string;
}
