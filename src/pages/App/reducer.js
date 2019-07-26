import { fromJS } from 'immutable';
import axios from 'axios';
import { loadState } from 'localStorage';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../Login/constants';
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
        .set('error', false);
    case LOGIN_FAILURE:
      return state
        .set('isFetching', false)
        .set('token', null)
        .set('error', action.payload);
    default:
      return state;
  }
}

export default authReducer;
