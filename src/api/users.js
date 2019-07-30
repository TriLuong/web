import Request from './request';
import { getEndPoint, endPoints } from './endpoints';

const URL_API_USERS = getEndPoint(endPoints.users);

export const getUsers = params => Request.get(URL_API_USERS, {
  params,
});
export const addUser = params => Request.post(URL_API_USERS, params);
export const updateUser = params => Request.patch(`${URL_API_USERS}/${params.data.id}`, params);
export const bulkUpload = params => Request.post(`${URL_API_USERS}/bulkUpload`, params);

export default { getUsers, addUser, updateUser, bulkUpload };
