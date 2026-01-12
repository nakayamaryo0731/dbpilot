// Re-export generated types from ts-rs
export type {
  SslMode,
  SavedConnection,
  SaveConnectionInput,
} from "./generated";

// ConnectionConfig with password field (not exported from Rust for security)
// The generated ConnectionConfig doesn't include password, so we extend it
import type { ConnectionConfig as BaseConnectionConfig } from "./generated";

export interface ConnectionConfig extends BaseConnectionConfig {
  password: string;
}
