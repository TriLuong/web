import { LOGIN_REQUEST } from './constants';

/* eslint-disable import/prefer-default-export */
export const doSignIn = ({ username, password }) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});
