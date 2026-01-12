// Re-export generated types from ts-rs
export type {
  ColumnMetadata,
  QueryResult,
  TableColumnInfo,
  TableRow,
  TableData,
  TableDataRequest,
  RowUpdate,
  RowInsert,
  RowDelete,
} from "./generated";

// Frontend-only type (not in Rust)
export interface PendingChange {
  type: "update" | "insert" | "delete";
  rowId: string;
  column?: string;
  originalValue?: unknown;
  newValue?: unknown;
  insertData?: Record<string, unknown>;
}
