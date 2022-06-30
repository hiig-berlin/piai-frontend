export interface AppProps {
  children?: React.ReactNode;
}
export type AppConfigRevalidateDates = {
  date: string;
  modified: string;
}

export type PiAiToolMenuItemActionItem = {
  action?: string;
  icon?: string;
};

export type PiAiToolMenuItem = {
  name: string;
  icon?: string;
  slug?: string;
  url?: string;
  target?: string;
  includeInSidebar?: boolean;
  sidebarName?: string;
  actionItems?: PiAiToolMenuItemActionItem[];
};

export type PiAiTool = {
  slug: string;
  name: string;
  description: string;
  colorBase: string;
  colorHighlight: string;
  iconShort: string;
  iconLong: string;
  menu: PiAiToolMenuItem[];
};

export interface AppConfig {
  siteMapFileName: string;
  errorLogUrl: string;
  preview: boolean;
  postsPerPage: number;
  defaultApiCacheTimeMinutes: number;
  previewPwd: string;
  appTitle: string;
  baseUrl: string;
  cmsUrl: string;
  ga4TagProperty: string;
  apiUrl: string;
  searchUrl: string;
  tools: PiAiTool[],
  revalidateInterval: (
    scope: string,
    dates?: AppConfigRevalidateDates
  ) => number;
}
