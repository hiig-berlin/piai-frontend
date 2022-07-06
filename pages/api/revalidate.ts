import { NextApiRequest, NextApiResponse } from "next";
import { appConfig } from "~/config";

const maybeLogError = async (error: any, alwaysSend?: boolean) => {
  if (appConfig.errorLogUrl.trim() || alwaysSend) {
    await fetch(appConfig.errorLogUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        message: "",
        stack: "",
        url: "",
        navigator: "",
        detectIt: "",
        ...error,
      }),
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.json({ status: 405, message: "Only POST requests allowed" });
    return;
  }

  if (typeof req.body !== "object") {
    res.json({ status: 406, message: "Please send JSON" });
    return;
  }

  try {
    // Check for secret to confirm this is a valid request
    if (req?.body?.token !== process.env.REVALIDATE_TOKEN) {
      await maybeLogError(
        {
          name: "Error: /api/revalidate 401 Invalid token",
        },
        true
      );
      return res.json({ status: 401, message: "Invalid token" });
    }

    if (req?.body?.paths?.length) {
      // !!! we use for (... of ...) loop as this handles async/await correctly
      for (const path of req?.body?.paths) {
        if (path.trim()) {
          let cleanPath = path.trim();
          // clean path from trailing slash if needed
          if (cleanPath !== "/")
            cleanPath = path.endsWith("/") ? path.slice(0, -1) : path;

          await maybeLogError({
            name: `INFO: /api/revalidate trigger: ${cleanPath}`,
          });

          await res.revalidate(cleanPath).catch(async (error: any) => {
            await maybeLogError(
              {
                name: `Error: /api/revalidate ${error?.name}`,
                message: error?.message,
                stack: error?.stack,
                url: cleanPath,
              },
              true
            );
          });
        }
        // })
      }
      return res.json({ status: 200, message: "ok" });
    } else {
      await maybeLogError({
        name: "Error: /api/revalidate 406 Please send an paths array with values",
      });
      res.json({
        status: 406,
        message: "Please send an paths array with values",
      });
    }
  } catch (error: any) {
    await maybeLogError(
      {
        name: `Error: /api/revalidate ${error?.name}`,
        message: error?.message,
        stack: error?.stack,
      },
      true
    );

    return res.send({ status: 500, message: "Error revalidating" });
  }
}
