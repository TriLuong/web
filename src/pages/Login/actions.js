import { createAction } from 'redux-actions';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  SET_PASSWORD,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAIL,
} from './constants';

export const requestLogin = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFail = createAction(LOGIN_FAILURE);
export const requestLogout = createAction(LOGOUT_REQUEST);

export const requestResetPassword = createAction(RESET_PASSWORD);
export const resetPasswordSuccess = createAction(RESET_PASSWORD_SUCCESS);
export const resetPasswordFail = createAction(RESET_PASSWORD_FAIL);

export const requestSetPassword = createAction(SET_PASSWORD);
export const setPasswordSuccess = createAction(SET_PASSWORD_SUCCESS);
export const setPasswordFail = createAction(SET_PASSWORD_FAIL);
