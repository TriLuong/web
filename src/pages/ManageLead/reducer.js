import { fromJS } from 'immutable';
import {
  GET_LEADS_REQUEST,
  GET_LEADS_SUCCESS,
  GET_LEADS_FAILURE,
  DELETE_LEAD_REQUEST,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAILURE,
  UPDATE_LEAD_REQUEST,
  UPDATE_LEAD_FAILURE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  dataLeads: [],
  error: null,
});

export default function manageLeadReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS_REQUEST:
    case DELETE_LEAD_REQUEST:
    case UPDATE_LEAD_REQUEST:
      return state.set('isFetching', true).set('error', false);
    case GET_LEADS_SUCCESS:
    case DELETE_LEAD_SUCCESS:
      return state
        .set('isFetching', false)
        .set('dataLeads', action.payload)
        .set('error', false);
    case GET_LEADS_FAILURE:
    case DELETE_LEAD_FAILURE:
    case UPDATE_LEAD_FAILURE:
      return state
        .set('isFetching', false)
        .set('dataLeads', [])
        .set('error', action.payload);
    default:
      return state;
  }
}
