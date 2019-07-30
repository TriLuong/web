import Request from './request';
import { getEndPoint, endPoints } from './endpoints';

const URL_API_LOGIN = getEndPoint(endPoints.auth.login);

export const login = payload => Request.post(URL_API_LOGIN, payload);
export default { login };
