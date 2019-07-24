import { put } from 'redux-saga/effects';
import { EDIT_PROFILE_SUCCUESS, EDIT_PROFILE_FAILED } from '../constants';
import users from '../../utils/test/users';

/* eslint-disable import/prefer-default-export */
export function* editProfileSaga(action) {
  console.log('editProfileSaga', action);
  const {
    payload: { firstName, lastName, email },
  } = action;
  console.log(firstName, lastName, email);
  if (
    firstName !== users.admin.firstName
    || lastName !== users.admin.lastName
    || email !== users.admin.email
  ) {
    yield put({
      type: EDIT_PROFILE_SUCCUESS,
      payload: { firstName, lastName, email },
    });
    console.log('EDIT Success');
  } else {
    yield put({ type: EDIT_PROFILE_FAILED, error: 'SAME INFO' });
    console.log('EDIT Failed');
  }
}
