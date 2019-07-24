/* eslint-disable no-unused-vars */
import { createAction } from 'redux-actions';
import { LOGIN_REQUEST } from './constants';

/* eslint import/prefer-default-export:0 */
// export const requestLogin = createAction(LOGIN_REQUEST);

export const requestLogin = ({ username, password }) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});
