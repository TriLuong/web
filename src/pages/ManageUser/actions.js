import { createAction } from 'redux-actions';
import { GET_USERS_REQUEST } from './constants';

/* eslint import/prefer-default-export: 0 */
export const getUsers = createAction(GET_USERS_REQUEST);
