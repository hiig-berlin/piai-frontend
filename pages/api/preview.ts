import { NextApiRequest, NextApiResponse } from "next";
import { restApiGetPostById } from "~/utils/restApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token, postId, postType } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (!token || !postId || !postType) {
    return res.status(401).json({ message: "Access denied #1" });
  }

  const post: any = await restApiGetPostById(postType, postId, token);

  // If the post doesn't exist prevent preview mode from being enabled
  if (!post || !post.id) {
    return res.status(401).json({ message: "Access denied #2" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    token,
  });
  
  let location = "/";
  switch (postType) {
    case "project":
      location = `/tool/map/project/${post.slug ? post.slug : `id--${post.id}`}`;
      break;

    case "page":
      if (post.slug !== "homepage")
        location = `/page/${post.slug ? post.slug : `id--${post.id}`}`;
      break;

  }
    
  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location: `${location}`,
  });

  res.end();
}
