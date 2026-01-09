use crate::error::AppError;
use crate::state::AppState;
use chrono::{DateTime, NaiveDate, NaiveDateTime, NaiveTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::postgres::PgRow;
use sqlx::{Column, Row};
use tauri::State;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct QueryResult {
    pub columns: Vec<ColumnMetadata>,
    pub rows: Vec<Vec<serde_json::Value>>,
    pub row_count: usize,
    pub execution_time_ms: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ColumnMetadata {
    pub name: String,
    pub data_type: String,
}

#[tauri::command]
pub async fn execute_query(
    query: String,
    state: State<'_, AppState>,
) -> Result<QueryResult, AppError> {
    let connection = state.connection.lock().await;

    let db = connection.as_ref().ok_or(AppError::NotConnected)?;

    let start = std::time::Instant::now();

    let rows = sqlx::query(&query).fetch_all(&db.pool).await?;

    let execution_time_ms = start.elapsed().as_millis() as u64;

    let columns = if rows.is_empty() {
        Vec::new()
    } else {
        rows[0]
            .columns()
            .iter()
            .map(|col| ColumnMetadata {
                name: col.name().to_string(),
                data_type: col.type_info().to_string(),
            })
            .collect()
    };

    let row_count = rows.len();
    let rows = rows.into_iter().map(|row| row_to_values(&row)).collect();

    Ok(QueryResult {
        columns,
        rows,
        row_count,
        execution_time_ms,
    })
}

fn row_to_values(row: &PgRow) -> Vec<serde_json::Value> {
    row.columns()
        .iter()
        .enumerate()
        .map(|(i, col)| {
            let type_name = col.type_info().to_string();
            match type_name.as_str() {
                "INT2" | "INT4" | "INT8" => row
                    .try_get::<i64, _>(i)
                    .map(serde_json::Value::from)
                    .unwrap_or(serde_json::Value::Null),
                "FLOAT4" | "FLOAT8" | "NUMERIC" => row
                    .try_get::<f64, _>(i)
                    .map(serde_json::Value::from)
                    .unwrap_or(serde_json::Value::Null),
                "BOOL" => row
                    .try_get::<bool, _>(i)
                    .map(serde_json::Value::from)
                    .unwrap_or(serde_json::Value::Null),
                "TEXT" | "VARCHAR" | "CHAR" | "NAME" => row
                    .try_get::<String, _>(i)
                    .map(serde_json::Value::from)
                    .unwrap_or(serde_json::Value::Null),
                "TIMESTAMPTZ" => row
                    .try_get::<DateTime<Utc>, _>(i)
                    .map(|dt| serde_json::Value::String(dt.to_rfc3339()))
                    .unwrap_or(serde_json::Value::Null),
                "TIMESTAMP" => row
                    .try_get::<NaiveDateTime, _>(i)
                    .map(|dt| serde_json::Value::String(dt.to_string()))
                    .unwrap_or(serde_json::Value::Null),
                "DATE" => row
                    .try_get::<NaiveDate, _>(i)
                    .map(|d| serde_json::Value::String(d.to_string()))
                    .unwrap_or(serde_json::Value::Null),
                "TIME" => row
                    .try_get::<NaiveTime, _>(i)
                    .map(|t| serde_json::Value::String(t.to_string()))
                    .unwrap_or(serde_json::Value::Null),
                "UUID" => row
                    .try_get::<uuid::Uuid, _>(i)
                    .map(|u| serde_json::Value::String(u.to_string()))
                    .unwrap_or(serde_json::Value::Null),
                "JSON" | "JSONB" => row
                    .try_get::<serde_json::Value, _>(i)
                    .unwrap_or(serde_json::Value::Null),
                _ => row
                    .try_get::<String, _>(i)
                    .map(serde_json::Value::from)
                    .unwrap_or(serde_json::Value::Null),
            }
        })
        .collect()
}
