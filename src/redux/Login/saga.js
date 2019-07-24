import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../constants';
import RouterNames from '../../containers/App/RouterNames';
import users from '../../utils/test/users';

/* eslint-disable import/prefer-default-export */
export function* logInSaga(action) {
  const {
    payload: { username, password },
  } = action;
  if (username === users.admin.username && password === users.admin.password) {
    const { firstName, lastName, email } = users.admin;
    localStorage.setItem(
      'userInfo',
      JSON.stringify({ username, password, firstName, lastName, email }),
    );
    yield put({
      type: LOGIN_SUCCESS,
      payload: { username, password, firstName, lastName, email },
    });
    yield put(push(RouterNames.manageUser.path));
    console.log('success');
  } else {
    yield put({ type: LOGIN_FAILED, error: 'ERROR' });
    console.log('falied');
  }
}
