import Request from './request';
import { getEndPoint } from './endpoints';

const URL_API_USERS = getEndPoint('users');

export const getUsers = params => Request.get(URL_API_USERS, {
  params,
});
export const addUser = params => Request.post(URL_API_USERS, params);
export const updateUser = params => Request.patch(`${URL_API_USERS}/${params.data.id}`, params);

export default { getUsers, addUser, updateUser };
