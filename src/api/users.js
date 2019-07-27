import Request from './request';
import { getEndPoint } from './endpoints';

const URL_API_USERS = getEndPoint('users');

export const getUsers = params => Request.get(URL_API_USERS, {
  params,
});

export const addUsers = params => Request.post(URL_API_USERS, params);

export default { getUsers, addUsers };
