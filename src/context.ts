import { createContext } from "react";

export interface AppContext {
  sources: SourcesMap;
  setSources: (sources: SourcesMap) => void;
}

export type SourcesMap = { [id: string]: Source };

export interface Source {
  name: string;
  tables: TablesMap;
  favourite: boolean;
}

export type TablesMap = { [id: string]: Table };

export interface Table {
  title: string;
  subTables?: TablesMap;
}

export interface SourceRaw {
  name: string;
  tables: TableRaw[];
}

export interface TableRaw {
  title: string;
}

export const APP_CONTEXT_DEFAULT_VALUE: AppContext = {
  sources: {},
  setSources: () => {},
};

export const appContext = createContext<AppContext>(APP_CONTEXT_DEFAULT_VALUE);
