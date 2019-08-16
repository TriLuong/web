import { fromJS } from 'immutable';
import {
  GET_LEADS_SCHEDULED_REQUEST,
  GET_LEADS_SCHEDULED_SUCCESS,
  GET_LEADS_SCHEDULED_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  leadsScheduled: [],
  error: null,
});

export default function leadsScheduledReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS_SCHEDULED_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case GET_LEADS_SCHEDULED_SUCCESS:
      return state
        .set('isFetching', false)
        .set('leadsScheduled', action.payload)
        .set('error', false);
    case GET_LEADS_SCHEDULED_FAILURE:
      return state.set('isFetching', false).set('error', action.payload);
    default:
      return state;
  }
}
