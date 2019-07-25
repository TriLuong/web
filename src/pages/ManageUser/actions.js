import { createAction } from 'redux-actions';
import { ADD_USER_REQUEST } from './constants';

/* eslint import/prefer-default-export: 0 */
export const requestUser = createAction(ADD_USER_REQUEST);
