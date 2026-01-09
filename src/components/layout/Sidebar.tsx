interface SidebarProps {
  width?: number;
}

export function Sidebar({ width = 240 }: SidebarProps) {
  return (
    <aside
      className="flex flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
      style={{ width }}
    >
      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Schema
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p className="px-2 py-4 text-center">No connection</p>
        </div>
      </div>
    </aside>
  );
}
