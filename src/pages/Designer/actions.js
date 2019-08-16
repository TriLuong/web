import { createAction } from 'redux-actions';
import {
  GET_LEADS_SCHEDULED_REQUEST,
  GET_LEADS_SCHEDULED_SUCCESS,
  GET_LEADS_SCHEDULED_FAILURE,
} from './constants';

export const getLeadsScheduled = createAction(GET_LEADS_SCHEDULED_REQUEST);
export const getLeadsScheduledSuccess = createAction(GET_LEADS_SCHEDULED_SUCCESS);
export const getLeadsScheduledFailure = createAction(GET_LEADS_SCHEDULED_FAILURE);
