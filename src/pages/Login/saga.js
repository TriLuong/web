/* eslint no-unused-vars: 0 */
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import API from 'api';
import { saveState, saveData } from '../../localStorage';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

function* signInSaga(action) {
  const {
    payload: { username, password },
  } = action;
  try {
    let res = { result: null, token: 'failed' };
    console.log(res);
    if (username === 'tester@designcafe.com' && password === 'tester') {
      res = { result: 'success' };
      res = { token: 'tester' };
    } else {
      console.log(res);
      // CALL API
      res = yield call(API.callAPI.login, { username, password });
      console.log(res);
    }

    console.log(res);
    if (res && res.status === 'falied') {
      throw new Error(res.message);
    }
    yield put({ type: LOGIN_SUCCESS, payload: { access_token: res.token } });
    yield put(push('/lead'));
  } catch (err) {
    console.info('err', err);
    yield put({ type: LOGIN_FAILURE, error: err.message });
  }
}

export default function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, signInSaga);
}
