import { create } from "zustand";
import { invoke } from "@tauri-apps/api/core";
import type { QueryResult } from "../types/query";

interface QueryState {
  query: string;
  result: QueryResult | null;
  isExecuting: boolean;
  error: string | null;

  setQuery: (query: string) => void;
  executeQuery: () => Promise<void>;
  clearResult: () => void;
  clearError: () => void;
}

export const useQueryStore = create<QueryState>((set, get) => ({
  query: "",
  result: null,
  isExecuting: false,
  error: null,

  setQuery: (query: string) => set({ query }),

  executeQuery: async () => {
    const { query } = get();
    if (!query.trim()) return;

    try {
      set({ isExecuting: true, error: null });
      const result = await invoke<QueryResult>("execute_query", { query });
      set({ result, isExecuting: false });
    } catch (error) {
      set({ isExecuting: false, error: String(error) });
    }
  },

  clearResult: () => set({ result: null }),

  clearError: () => set({ error: null }),
}));
