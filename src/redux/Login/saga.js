import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../constants';
import RouterNames from '../../containers/App/RouterNames';

/* eslint-disable import/prefer-default-export */
export function* logInSaga(action) {
  const {
    payload: { username, password },
  } = action;
  console.log(username, password);
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('userInfo', JSON.stringify({ username, password }));
    yield put({
      type: LOGIN_SUCCESS,
      payload: { username, password },
      error: '',
    });
    yield put(push(RouterNames.manageUser.path));
    console.log('success');
  } else {
    yield put({ type: LOGIN_FAILED, payload: {}, error: 'ERROR' });
    console.log('falied');
  }
}
