import Request from './request';
import { getEndPoint } from './endpoints';

const URL_API_LOGIN = getEndPoint('login');

export const login = payload => Request.post(URL_API_LOGIN, payload);
export default { login };
