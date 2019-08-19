import { fromJS } from 'immutable';
import {
  GET_LEAD_BY_ID_REQUEST,
  GET_LEAD_BY_ID_SUCCESS,
  GET_LEAD_BY_ID_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  lead: {},
  error: null,
});

export default function meetingInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEAD_BY_ID_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case GET_LEAD_BY_ID_SUCCESS:
      return state
        .set('isFetching', false)
        .set('lead', action.payload)
        .set('error', false);
    case GET_LEAD_BY_ID_FAILURE:
      return state
        .set('isFetching', false).set('error', action.payload);
    default:
      return state;
  }
}
