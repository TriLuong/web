import { createAction } from 'redux-actions';
import {
  GET_USERS_REQUEST,
  ADD_USERS_REQUEST,
  ADD_USERS_SUCCESS,
  ADD_USERS_FAILURE,
  UPDATE_USERS_REQUEST,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_FAILURE,
} from './constants';

export const getUsers = createAction(GET_USERS_REQUEST);
export const addUser = createAction(ADD_USERS_REQUEST);
export const addUserSuccess = createAction(ADD_USERS_SUCCESS);
export const addUserFail = createAction(ADD_USERS_FAILURE);
export const updateUser = createAction(UPDATE_USERS_REQUEST);
export const updateUserSuccess = createAction(UPDATE_USERS_SUCCESS);
export const updateUserFail = createAction(UPDATE_USERS_FAILURE);
