import { createAction } from 'redux-actions';
import {
  GET_LEADS_SCHEDULED_REQUEST,
  GET_LEADS_SCHEDULED_SUCCESS,
  GET_LEADS_SCHEDULED_FAILURE,
  RESCHEDULE_LEAD_REQUEST,
  RESCHEDULE_LEAD_SUCCESS,
  RESCHEDULE_LEAD_FAILURE,
} from './constants';

export const getLeadsScheduled = createAction(GET_LEADS_SCHEDULED_REQUEST);
export const getLeadsScheduledSuccess = createAction(GET_LEADS_SCHEDULED_SUCCESS);
export const getLeadsScheduledFailure = createAction(GET_LEADS_SCHEDULED_FAILURE);

export const reScheduleLead = createAction(RESCHEDULE_LEAD_REQUEST);
export const reScheduleLeadSuccess = createAction(RESCHEDULE_LEAD_SUCCESS);
export const reScheduleLeadFailure = createAction(RESCHEDULE_LEAD_FAILURE);
