export interface AppProps {
  children?: React.ReactNode;
}
export type AppConfigRevalidateDates = {
  date: string;
  modified: string;
}


export type PiAiToolMenuItem = {
  name: string;
  slug?: string;
  url?: string;
  target?: string;
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
