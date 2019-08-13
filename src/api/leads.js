import Request from './request';
import { getEndPoint, endPoints } from './endpoints';

const URL_API_LEADS = getEndPoint(endPoints.leads);

export const getLeads = params => Request.get(URL_API_LEADS, { params });
export const updateLead = params => Request.patch(`${URL_API_LEADS}/${params.data.id}`, params);

export default { getLeads, updateLead };
