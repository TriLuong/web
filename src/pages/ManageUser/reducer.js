import { fromJS } from 'immutable';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  ADD_USERS_REQUEST,
  ADD_USERS_SUCCESS,
  ADD_USERS_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  dataUsers: {},
  error: null,
});

export default function manageUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
    case ADD_USERS_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case GET_USERS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('dataUsers', action.payload)
        .set('error', false);
    case GET_USERS_FAILURE:
      return state
        .set('isFetching', false)
        .set('dataUsers', {})
        .set('error', action.error);
    case ADD_USERS_SUCCESS: {
      const users = state.getIn(['dataUsers', 'users']);
      return state.setIn(['dataUsers', 'users'], [action.payload, ...users]);
    }
    case ADD_USERS_FAILURE:
      return state.set('error', action.payload.message);
    default:
      return state;
  }
}
