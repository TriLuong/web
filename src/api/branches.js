import Request from './request';
import { getEndPoint, endPoints } from './endpoints';

const URL_API_BRANCHES = getEndPoint(endPoints.branches);

export const getBranches = () => Request.get(URL_API_BRANCHES);

export default { getBranches };
