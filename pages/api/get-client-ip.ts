import { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "~/utils/getClientIP";

const getClientIpHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const clientIp = getClientIp(req);
  res.status(200).json({ ip: clientIp });
};

export default getClientIpHandler;
