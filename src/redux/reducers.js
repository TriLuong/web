import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

const initialStateLogin = {
  isFetching: false,
  payload: {},
  error: '',
};

/* eslint-disable import/prefer-default-export */
export function logInReducer(state = initialStateLogin, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESS:
      return { ...state, payload: action.payload, error: '' };
    case LOGIN_FAILED:
      return { ...state, payload: {}, error: action.error };
    default:
      return state;
  }
}
