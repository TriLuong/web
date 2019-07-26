import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Auth } from 'api';
import axios from 'axios';
import { loginSuccess, loginFail } from './actions';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from './constants';

function* signInSaga(action) {
  const {
    payload: { username, password },
  } = action;
  try {
    const res = yield call(Auth.login, { email: username, password });

    if (res.data.status === 'failed') {
      yield put(loginFail(res.message));
    }
    const { token, user } = res.data;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    yield put(loginSuccess({ token, user }));
    yield put(push('/'));
  } catch (err) {
    yield put(loginFail(err.response.data.message));
  }
}

function* signOutSaga() {
  axios.defaults.headers.common.Authorization = '';
  yield put(push('/login'));
}

export default function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, signInSaga);
  yield takeLatest(LOGOUT_REQUEST, signOutSaga);
}
