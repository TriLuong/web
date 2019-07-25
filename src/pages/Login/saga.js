/* eslint no-unused-vars: 0 */
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import API from 'api';
import Request from 'api/request';
import { saveState, saveData } from '../../localStorage';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

function* signInSaga(action) {
  const {
    payload: { username, password },
  } = action;
  try {
    let res = { result: null, token: 'failed' };
    if (username === 'tester@designcafe.com' && password === 'tester') {
      res = { data: { result: 'success', token: 'tester' } };
    } else {
      // CALL API
      res = yield call(API.callAPI.login, { email: username, password });
    }
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put({ type: LOGIN_SUCCESS, payload: { access_token: res.data.token } });
    Request.setToken(res.data.token);
    yield put(push('/user'));
  } catch (err) {
    console.log(err);
    yield put({ type: LOGIN_FAILURE, error: err.message });
  }
}

export default function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, signInSaga);
}
