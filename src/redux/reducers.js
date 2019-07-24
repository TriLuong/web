import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCUESS,
  EDIT_PROFILE_FAILED,
} from './constants';

const initialStateUserInfo = {
  isFetching: false,
  payload: {},
  error: '',
};

/* eslint-disable import/prefer-default-export */
export function userInfoReducer(state = initialStateUserInfo, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESS:
      return { ...state, payload: action.payload, error: '' };
    case LOGIN_FAILED:
      return { ...state, payload: {}, error: action.error };
    case EDIT_PROFILE_REQUEST:
      return { ...state, isFetching: true };
    case EDIT_PROFILE_SUCCUESS:
      return { ...state, payload: action.payload, error: '' };
    case EDIT_PROFILE_FAILED:
      return { ...state, payload: {}, error: action.error };
    default:
      return state;
  }
}
