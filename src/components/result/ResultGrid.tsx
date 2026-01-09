import { useQueryStore } from "../../store/queryStore";

export function ResultGrid() {
  const { result, error, isExecuting } = useQueryStore();

  if (isExecuting) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Executing query...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Run a query to see results
      </div>
    );
  }

  if (result.columns.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Query executed successfully (no results)
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
            <tr>
              {result.columns.map((col, i) => (
                <th
                  key={i}
                  className="border-b border-r border-gray-200 px-3 py-2 text-left font-medium dark:border-gray-700"
                >
                  <div>{col.name}</div>
                  <div className="text-xs font-normal text-gray-400">
                    {col.data_type}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border-b border-r border-gray-200 px-3 py-1.5 dark:border-gray-700"
                  >
                    {cell === null ? (
                      <span className="text-gray-400 italic">NULL</span>
                    ) : (
                      String(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800">
        {result.row_count} rows in {result.execution_time_ms}ms
      </div>
    </div>
  );
}
