import { createAction } from 'redux-actions';
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

export const getLeads = createAction(GET_LEADS_REQUEST);
export const getLeadsSuccess = createAction(GET_LEADS_SUCCESS);
export const getLeadsFailure = createAction(GET_LEADS_FAILURE);

export const deleteLead = createAction(DELETE_LEAD_REQUEST);
export const deleteLeadSuccess = createAction(DELETE_LEAD_SUCCESS);
export const deleteLeadFailure = createAction(DELETE_LEAD_FAILURE);

/* LEAD-DETAIL */
export const getLead = createAction(GET_LEAD_REQUEST);
export const getLeadSuccess = createAction(GET_LEAD_SUCCESS);
export const getLeadFailure = createAction(GET_LEAD_FAILURE);
