import { fromJS } from 'immutable';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  ADD_USERS_SUCCESS,
  UPDATE_USERS_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  dataUsers: {},
  branches: [],
  error: null,
});

export default function manageUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
    case GET_BRANCHES_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case GET_USERS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('dataUsers', action.payload)
        .set('error', false);
    case GET_USERS_FAILURE:
      return state
        .set('isFetching', false)
        .set('dataUsers', [])
        .set('error', action.error);
    case ADD_USERS_SUCCESS: {
      const users = state.getIn(['dataUsers', 'users']);
      users.pop();
      return state.setIn(['dataUsers', 'users'], [action.payload, ...users]);
    }
    case UPDATE_USERS_SUCCESS:
    case EDIT_PROFILE_SUCCESS: {
      const users = state.getIn(['dataUsers', 'users']);
      const objIndex = users.findIndex(item => item.id === action.payload.id);
      users[objIndex] = action.payload;
      return state.setIn(['dataUsers', 'users'], [...users]);
    }
    case GET_BRANCHES_SUCCESS:
      return state
        .set('isFetching', false)
        .set('branches', action.payload)
        .set('error', false);
    case GET_BRANCHES_FAILURE:
      return state
        .set('isFetching', false)
        .set('branches', [])
        .set('error', action.error);
    default:
      return state;
  }
}
