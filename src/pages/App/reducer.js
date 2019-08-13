import { fromJS } from 'immutable';
import axios from 'axios';
import { loadState } from 'localStorage';
import { EDIT_PROFILE_SUCCESS } from 'pages/ManageUser/constants';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from '../Login/constants';
import { GET_BRANCHES_SUCCESS } from './constants';

// The initial state of the App
const persitedState = loadState();
const { token } = persitedState;
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export const initialState = fromJS({
  isFetching: false,
  user: null,
  error: null,
  branches: [],
  notifications: [],
  ...persitedState,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case LOGIN_SUCCESS:
      return state
        .set('isFetching', false)
        .set('token', action.payload.token)
        .set('user', action.payload.user)
        .set('error', false);
    case LOGIN_FAILURE:
      return state
        .set('isFetching', false)
        .set('token', null)
        .set('error', action.payload);
    case LOGOUT_REQUEST:
      return state
        .set('isFetching', false)
        .set('user', null)
        .set('token', null)
        .set('error', null);
    case EDIT_PROFILE_SUCCESS:
      return state
        .set('isFetching', false)
        .set('user', action.payload)
        .set('error', false);
    case GET_BRANCHES_SUCCESS:
      return state
        .set('branches', action.payload);
    default:
      return state;
  }
}

export default authReducer;
