import Editor from "@monaco-editor/react";
import { useQueryStore } from "../../store/queryStore";

export function SqlEditor() {
  const { query, setQuery } = useQueryStore();

  return (
    <Editor
      height="100%"
      defaultLanguage="sql"
      value={query}
      onChange={(value) => setQuery(value || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
        tabSize: 2,
        padding: { top: 8, bottom: 8 },
      }}
    />
  );
}
