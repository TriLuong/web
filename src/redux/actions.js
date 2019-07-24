import { LOGIN_REQUEST, EDIT_PROFILE_REQUEST } from './constants';

/* eslint-disable import/prefer-default-export */
export const doSignIn = ({ username, password }) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const doEditProfile = ({ firstName, lastName, email }) => ({
  type: EDIT_PROFILE_REQUEST,
  payload: { firstName, lastName, email },
});
