import { NextApiRequest, NextApiResponse } from "next";
import { appConfig } from "~/config";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const param = req?.query?.file;

  if (param && param.indexOf('/') === -1 && param.indexOf('sitemap') !== -1  && param.indexOf('.xml') !== -1) {
    const url = param;
    const sitemap = await fetch(`${appConfig.cmsUrl}/${url}`).then(
      (response: Response) => {
        if (response) {
          res.status(response.status);
          if (response.headers.has("content-type"))
            res.setHeader("content-type", response.headers.get("content-type") ?? "text/xml; charset=UTF-8");
          return response.text();
        }
        return null;
      }
    ).then((body) => body)
    .catch((err) => {
      res.status(500);
      res.write("Internal server error");
    })
    
    if (sitemap) {
      res.write(sitemap);
    }

  } else {
    res.status(403);
    res.write("Access denied");
  }
  

  res.end();
}
