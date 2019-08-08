import Request from './request';
import { getEndPoint, endPoints } from './endpoints';

const URL_API_LEADS = getEndPoint(endPoints.leads);

export const getLeads = () => Request.get(URL_API_LEADS);

export default { getLeads };
