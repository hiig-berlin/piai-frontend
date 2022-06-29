export interface AppProps {
  children?: React.ReactNode;
}
export type AppConfigRevalidateDates = {
  date: string;
  modified: string;
}


export type PluginMenuItem = {
  name: string;
  slug?: string;
  url?: string;
  target?: string;
};

export type Plugin = {
  slug: string;
  name: string;
  colorBase: string;
  colorHighlight: string;
  iconShort: string;
  iconLong: string;
  menu: PluginMenuItem[];
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
  plugins: Plugin[],
  revalidateInterval: (
    scope: string,
    dates?: AppConfigRevalidateDates
  ) => number;
}
