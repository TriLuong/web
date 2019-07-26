/* eslint no-unused-vars: 0 */
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Auth } from 'api';
import { saveState, saveData } from '../../localStorage';
import { loginSuccess, loginFail } from './actions';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

function* signInSaga(action) {
  const {
    payload: { username, password },
  } = action;
  try {
    const res = yield call(Auth.login, { email: username, password });

    if (res.data.status === 'failed') {
      yield put(loginFail(res.message));
    }
    yield put(loginSuccess({ token: res.data.token }));
    yield put(push('/'));
  } catch (err) {
    yield put(loginFail(err.response.data.message));
  }
}

export default function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, signInSaga);
}
