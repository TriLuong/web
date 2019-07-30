import Request from './request';
import { getEndPoint, endPoints } from './endpoints';

const URL_API_LOGIN = getEndPoint(endPoints.auth.login);
const URL_API_RESET = getEndPoint(endPoints.auth.resetPassword);
const URL_API_SET_PASSWORD = getEndPoint(endPoints.auth.setPassword);

export const login = payload => Request.post(URL_API_LOGIN, payload);
export const resetPassword = payload => Request.post(URL_API_RESET, payload);
export const setPassword = payload => Request.post(URL_API_SET_PASSWORD, payload);
export default { login, resetPassword, setPassword };
