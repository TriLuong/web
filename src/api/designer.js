import Request from './request';
import { getEndPoint, endPoints } from './endpoints';

/* Currently, use API of LEADS */
const URL_API_LEADS = getEndPoint(endPoints.leads);

export const getLeadsScheduled = params => Request.get(URL_API_LEADS, { params });
// export const updateLead = params => Request.patch(`${URL_API_LEADS}/${params.data.id}`, params);
// export const getLeadById = params => Request.get(`${URL_API_LEADS}/${params.id}`);
// export const deleteLeadById = id => Request.delete(`${URL_API_LEADS}/${id}`);
export default { getLeadsScheduled };
