import Request from './request';
import { getEndPoint } from './endpoints';

const URL_API_USER = getEndPoint('user');

export const addUser = params => Request.post(URL_API_USER, params);
export const updateUser = params => Request.patch(`${URL_API_USER}`, params);

export const changePassword = params => Request.post(`${URL_API_USER}/password-change`, params);

export default { addUser, updateUser, changePassword };
