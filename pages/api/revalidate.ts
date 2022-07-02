import { NextApiRequest, NextApiResponse } from "next";

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
      return res.json({ status: 401, message: "Invalid token" });
    }

    if (req?.body?.paths?.length) {
      req?.body?.paths?.forEach(async (path: string) => {
        if (path.trim()) {
          let cleanPath = path;
          // clean path from trailing slash if needed
          if (cleanPath !== "/")
            cleanPath = path.endsWith("/") ? path.slice(0, -1) : path;

          await res.revalidate(cleanPath).catch((err) => {
            // fail silently ... 
          });
        }
      });
    }

    return res.json({ status: 200, message: "ok" });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.send({ status: 500, message: "Error revalidating" });
  }
}
