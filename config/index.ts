import { AppConfig, AppConfigRevalidateDates } from "~/types";
import { tools } from "./tools";

const ONE_MINUTE = 1000 * 60 * 60;
const ONE_HOUR = 1000 * 60 * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_MONTH * 365;

export const appConfig: AppConfig = {
  appTitle: "Public Interest AI",
  preview: `${process.env.NEXT_PUBLIC_PREVIEW_LOCKED}` === "1",
  postsPerPage: 24,
  siteMapFileName: "sitemap_index.xml",
  defaultApiCacheTimeMinutes: parseInt(
    `${process.env.NEXT_PUBLIC_DEFAULT_API_CACHE_TIME ?? 5}`
  ),
  previewPwd: `${process.env.NEXT_PUBLIC_PREVIEW_PWD}`,
  baseUrl:
    process.env.NODE_ENV === "development"
      ? ""
      : `${process.env.NEXT_PUBLIC_URL ?? ""}`,
  cmsUrl: `${process.env.NEXT_PUBLIC_CMS_BASE_URL ?? ""}`,
  errorLogUrl: `${process.env.NEXT_PUBLIC_ERROR_LOG_URL ?? ""}`,
  apiUrl: `${process.env.NEXT_PUBLIC_CMS_BASE_URL ?? ""}/wp-json`,
  searchUrl: `${process.env.NEXT_PUBLIC_API_URL ?? ""}`,
  matomoTrackingUrl: `${process.env.NEXT_PUBLIC_MATOMO_TRACKING_URL ?? ""}`,
  matomoTrackingId: `${process.env.NEXT_PUBLIC_MATOMO_TRACKING_ID ?? ""}`,
  tools,
  revalidateInterval: (scope: string, dates?: AppConfigRevalidateDates) => {
    const defaultInterval =
      process.env.NODE_ENV === "development"
        ? 0.5
        : parseInt(`${process.env.NEXT_PUBLIC_DEFAULT_API_CACHE_TIME ?? 5}`);

    if (dates) {
      try {
        // const date = new Date(dates.date.replace(/ /g,"T")).getTime();
        const modified = new Date(dates.date.replace(/ /g, "T")).getTime();
        const today = new Date().getTime();

        if (today - modified < ONE_MINUTE) {
          return 30; // 30 sec
        } else if (today - modified < ONE_MINUTE * 30) {
          return 60; // 60 sec
        } else if (today - modified < ONE_HOUR) {
          return 90; // 90 sec
        } else if (today - modified < ONE_HOUR * 8) {
          return 180; // 3 min
        } else if (today - modified < ONE_DAY) {
          return 300; // 5 min
        } else if (today - modified < ONE_DAY * 15) {
          return 3600 * 24; // 1 day
        } else if (today - modified < ONE_MONTH) {
          return 3600 * 24 * 7; // 1 week
        } else {
          return 3600 * 24 * 30; // 1 month
        }
      } catch (e) {}
    }
    return defaultInterval * 60;
  },
};
