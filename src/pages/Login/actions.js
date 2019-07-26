import { createAction } from 'redux-actions';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from './constants';

export const requestLogin = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFail = createAction(LOGIN_FAILURE);
export const requestLogout = createAction(LOGOUT_REQUEST);
export default {};
