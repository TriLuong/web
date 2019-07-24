import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

function* signInSaga(action) {
  const {
    payload: { username, password },
  } = action;
  try {
    let res = null;
    if (username === 'tester' && password === 'tester') {
      res = { data: { result: 'success' } };
      res = { data: { access_token: 'tester' } };
    } else {
      // res = yield call(Api.callapi.login, { username, password });
    }
    // console.log(res);
    if (res.data && res.data.result === 'error') {
      throw new Error('email or password is incorrect');
    }
    yield put({ type: LOGIN_SUCCESS, payload: { access_token: 'loginSuccess' } });
    yield put(push('/lead'));
  } catch (err) {
    yield put({ type: LOGIN_FAILURE });
  }
}

export default function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, signInSaga);
}
