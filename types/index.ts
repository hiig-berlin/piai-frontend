export interface AppProps {
  children?: React.ReactNode;
}
export type AppConfigRevalidateDates = {
  date: string;
  modified: string;
}

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
  revalidateInterval: (
    scope: string,
    dates?: AppConfigRevalidateDates
  ) => number;
}
