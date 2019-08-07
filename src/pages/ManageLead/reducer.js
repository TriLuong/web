import { fromJS } from 'immutable';
import {
  GET_LEADS_REQUEST,
  GET_LEADS_SUCCESS,
  GET_LEADS_FAILURE,
  DELETE_LEAD_REQUEST,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAILURE,
  GET_LEAD_REQUEST,
  GET_LEAD_SUCCESS,
  GET_LEAD_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  dataLeads: [],
  lead: {},
  error: null,
});

export default function manageLeadReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS_REQUEST:
    case DELETE_LEAD_REQUEST:
    case GET_LEAD_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case GET_LEADS_SUCCESS:
    case DELETE_LEAD_SUCCESS:
      return state
        .set('isFetching', false)
        .set('dataLeads', action.payload)
        .set('error', false);
    case GET_LEADS_FAILURE:
    case DELETE_LEAD_FAILURE:
      return state
        .set('isFetching', false)
        .set('dataLeads', [])
        .set('error', action.payload);
    case GET_LEAD_SUCCESS:
      return state
        .set('isFetching', false)
        .set('lead', action.payload)
        .set('error', false);
    case GET_LEAD_FAILURE:
      return state
        .set('isFetching', false)
        .set('lead', {})
        .set('error', action.payload);
    default:
      return state;
  }
}
