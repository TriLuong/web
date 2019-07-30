import { fromJS } from 'immutable';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../Login/constants';
import { IS_CONNECTING, IS_END_CONNECTING } from './constants';

// The initial state of the App
export const initialState = fromJS({
  isFetching: false,
});

function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case IS_CONNECTING:
      return state.set('isFetching', true);
    case LOGIN_SUCCESS:
    case IS_END_CONNECTING:
    case LOGIN_FAILURE:
      return state.set('isFetching', false);

    default:
      return state;
  }
}

export default loaderReducer;
