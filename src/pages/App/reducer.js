
import { fromJS } from 'immutable';


// The initial state of the App
export const initialState = fromJS({
  isFetching: false,
  user: null,
  error: null,
  notifications: [],
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default authReducer;
