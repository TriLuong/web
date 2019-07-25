import { fromJS } from 'immutable';
import { loadState } from 'localStorage';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../Login/constants';

const persistedState = loadState() || {};
// The initial state of the App
export const initialState = fromJS({
  isFetching: false,
  token: persistedState.token,
  user: null,
  error: null,
  notifications: [],
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case LOGIN_SUCCESS:
      return state
        .set('isFetching', false)
        .set('token', action.payload.access_token)
        .set('error', false);
    case LOGIN_FAILURE:
      return state
        .set('isFetching', false)
        .set('token', null)
        .set('error', 'Username or Password is invalid');
    default:
      return state;
  }
}

export default authReducer;
