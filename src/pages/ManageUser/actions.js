import { createAction } from 'redux-actions';
import {
  GET_USERS_REQUEST,
  ADD_USERS_REQUEST,
  ADD_USERS_SUCCESS,
  ADD_USERS_FAILURE,
  UPDATE_USERS_REQUEST,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  BULK_UPLOAD_FAILURE,
  BULK_UPLOAD_REQUEST,
  BULK_UPLOAD_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAILURE,
} from './constants';

export const getUsers = createAction(GET_USERS_REQUEST);
export const addUser = createAction(ADD_USERS_REQUEST);
export const addUserSuccess = createAction(ADD_USERS_SUCCESS);
export const addUserFail = createAction(ADD_USERS_FAILURE);
export const updateUser = createAction(UPDATE_USERS_REQUEST);
export const updateUserSuccess = createAction(UPDATE_USERS_SUCCESS);
export const updateUserFail = createAction(UPDATE_USERS_FAILURE);
export const editProfile = createAction(EDIT_PROFILE_REQUEST);
export const editProfileSuccess = createAction(EDIT_PROFILE_SUCCESS);
export const editProfileFailure = createAction(EDIT_PROFILE_FAILURE);
export const changePassword = createAction(CHANGE_PASSWORD_REQUEST);
export const changePasswordSuccess = createAction(CHANGE_PASSWORD_SUCCESS);
export const changePasswordFailure = createAction(CHANGE_PASSWORD_FAILURE);

export const requestBulkUpload = createAction(BULK_UPLOAD_REQUEST);
export const bulkUploadSuccess = createAction(BULK_UPLOAD_SUCCESS);
export const bulkUploadFailure = createAction(BULK_UPLOAD_FAILURE);

export const requestDeleteUser = createAction(DELETE_USER_REQUEST);
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS);
export const deleteUserFailure = createAction(DELETE_USER_FAILURE);
