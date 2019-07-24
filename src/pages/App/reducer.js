import { fromJS } from 'immutable';
import { LOGIN_REQUEST } from '../Login/constants';

// The initial state of the App
export const initialState = fromJS({
  isFetching: false,
  user: null,
  error: null,
  notifications: [],
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, user: action.payload, error: action.meta };
    default:
      return state;
  }
}

export default authReducer;
