export interface ColumnMetadata {
  name: string;
  data_type: string;
}

export interface QueryResult {
  columns: ColumnMetadata[];
  rows: unknown[][];
  row_count: number;
  execution_time_ms: number;
}
