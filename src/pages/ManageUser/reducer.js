import { fromJS } from 'immutable';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  users: [],
  error: null,
});

export default function manageUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case GET_USERS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('users', action.payload)
        .set('error', false);
    case GET_USERS_FAILURE:
      return state
        .set('isFetching', false)
        .set('users', [])
        .set('error', action.error);
    default:
      return state;
  }
}
