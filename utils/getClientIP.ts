import requestIp from 'request-ip';
import { NextApiRequest } from 'next';

export const getClientIp = (req: NextApiRequest) => {
  return requestIp.getClientIp(req);
};
