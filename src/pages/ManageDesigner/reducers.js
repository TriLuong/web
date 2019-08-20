import { fromJS } from 'immutable';
import {
  GET_LEADS_SCHEDULED_REQUEST,
  GET_LEADS_SCHEDULED_SUCCESS,
  GET_LEADS_SCHEDULED_FAILURE,
  RESCHEDULE_LEAD_REQUEST,
  RESCHEDULE_LEAD_SUCCESS,
  RESCHEDULE_LEAD_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  leadsScheduled: [],
  error: null,
});

export default function leadsScheduledReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS_SCHEDULED_REQUEST:
    case RESCHEDULE_LEAD_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case GET_LEADS_SCHEDULED_SUCCESS:
      return state
        .set('isFetching', false)
        .set('leadsScheduled', action.payload)
        .set('error', false);
    case RESCHEDULE_LEAD_SUCCESS: {
      const leads = state.getIn(['leadsScheduled', 'leads']);
      const objIndex = leads.findIndex(item => item.id === action.payload.id);
      leads[objIndex] = action.payload;
      return state.setIn(['leadsScheduled', 'leads'], [...leads]);
    }
    case GET_LEADS_SCHEDULED_FAILURE:
    case RESCHEDULE_LEAD_FAILURE:
      return state.set('isFetching', false).set('error', action.payload);
    default:
      return state;
  }
}
