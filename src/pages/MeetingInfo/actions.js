import { createAction } from 'redux-actions';
import {
  GET_LEAD_BY_ID_REQUEST,
  GET_LEAD_BY_ID_SUCCESS,
  GET_LEAD_BY_ID_FAILURE,
} from './constants';

export const getLeadById = createAction(GET_LEAD_BY_ID_REQUEST);
export const getLeadByIdSuccess = createAction(GET_LEAD_BY_ID_SUCCESS);
export const getLeadByIdFailure = createAction(GET_LEAD_BY_ID_FAILURE);
