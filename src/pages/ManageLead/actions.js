import { createAction } from 'redux-actions';
import {
  GET_LEADS_REQUEST,
  GET_LEADS_SUCCESS,
  GET_LEADS_FAILURE,
  DELETE_LEAD_REQUEST,
  DELETE_LEAD_SUCCESS,
  DELETE_LEAD_FAILURE,
  GET_LEAD_BY_ID_REQUEST,
  GET_LEAD_BY_ID_SUCCESS,
  GET_LEAD_BY_ID_FAILURE,
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAILURE,
  UPDATE_LEAD_REQUEST,
  UPDATE_LEAD_SUCCESS,
  UPDATE_LEAD_FAILURE,
} from './constants';

export const getLeads = createAction(GET_LEADS_REQUEST);
export const getLeadsSuccess = createAction(GET_LEADS_SUCCESS);
export const getLeadsFailure = createAction(GET_LEADS_FAILURE);

export const deleteLead = createAction(DELETE_LEAD_REQUEST);
export const deleteLeadSuccess = createAction(DELETE_LEAD_SUCCESS);
export const deleteLeadFailure = createAction(DELETE_LEAD_FAILURE);

export const getBranches = createAction(GET_BRANCHES_REQUEST);
export const getBranchesSuccess = createAction(GET_BRANCHES_SUCCESS);
export const getBranchesFailure = createAction(GET_BRANCHES_FAILURE);

/* LEAD-DETAIL */
export const getLeadByID = createAction(GET_LEAD_BY_ID_REQUEST);
export const getLeadByIDSuccess = createAction(GET_LEAD_BY_ID_SUCCESS);
export const getLeadByIDFailure = createAction(GET_LEAD_BY_ID_FAILURE);

export const updateLead = createAction(UPDATE_LEAD_REQUEST);
export const updateLeadSuccess = createAction(UPDATE_LEAD_SUCCESS);
export const updateLeadFailure = createAction(UPDATE_LEAD_FAILURE);
