import { GetServerSideProps } from 'next'
import React from 'react'
import { appConfig } from '~/config'

const Sitemap: React.FC = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {

  
  if (res) {
    
    let status = 200;
    let contentType = "application/xml; charset=UTF-8";

    let body = await fetch(`${appConfig.cmsUrl}/${appConfig.siteMapFileName}`)
      .then((response: Response) => {
        if (response) {
          status = response.status;

          if (response.headers.has("content-type"))
            contentType =
              response.headers.get("content-type") ?? contentType;
          return response.text();
        }
        return null;
      })
      .then((body) => body)
      .catch((err) => {
        status = 500;
        return "Internal server error";
      });

    res.statusCode = status;
    
    res.setHeader("expires", "Mon, 23 Jul 1997 05:00:00 GMT");
    if (status === 200) {
      res.setHeader("content-type", contentType);
    } else if (status !== 500) {
      res.setHeader("content-type", "text/html");
    } else {
      res.setHeader("content-type", "text/plain");
    }
    res.setHeader("cache-control", "no-cache, must-revalidate")
    
    res.write(body)
    res.end()
  }
  return {
    props: {},
  }
}

export default Sitemap
