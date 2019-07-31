import { createAction } from 'redux-actions';
import { GET_LEADS_REQUEST, GET_LEADS_SUCCESS, GET_LEADS_FAILURE } from './constants';

export const getLeads = createAction(GET_LEADS_REQUEST);
export const getLeadsSuccess = createAction(GET_LEADS_SUCCESS);
export const getLeadsFailure = createAction(GET_LEADS_FAILURE);
