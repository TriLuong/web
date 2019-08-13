import { createAction } from 'redux-actions';
import { GET_BRANCHES_REQUEST, GET_BRANCHES_SUCCESS, GET_BRANCHES_FAILURE } from './constants';

export const getBranches = createAction(GET_BRANCHES_REQUEST);
export const getBranchesSuccess = createAction(GET_BRANCHES_SUCCESS);
export const getBranchesFailure = createAction(GET_BRANCHES_FAILURE);
