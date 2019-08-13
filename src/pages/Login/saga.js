import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Auth } from 'api';
import axios from 'axios';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import { getBranches } from 'pages/App/actions';
import { loginSuccess, loginFail, resetPasswordFail, setPasswordFail } from './actions';
import { LOGIN_REQUEST, LOGOUT_REQUEST, RESET_PASSWORD, SET_PASSWORD } from './constants';

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
    yield put(getBranches());
    if (user.role === 'admin') {
      yield put(push('/'));
    } else {
      yield put(push('/leads'));
    }
  } catch (err) {
    alert(err.response.data.message);
    yield put(loginFail(err.response.data.message));
  }
}

function* signOutSaga() {
  axios.defaults.headers.common.Authorization = '';
  yield put(push('/login'));
}

function* resetPasswordSaga(action) {
  yield put(isConnecting());
  const {
    payload: { email, cb },
  } = action;
  try {
    const res = yield call(Auth.resetPassword, { email });

    if (res.data.status === 'failed') {
      yield put(resetPasswordFail(res.message));
    }

    if (cb) {
      cb(true);
    }
    yield put(isEndConnecting());
  } catch (err) {
    alert(err.response.data.message);
    yield put(resetPasswordFail(err.response.data.message));
    yield put(isEndConnecting());
  }
}

function* setPasswordSaga(action) {
  yield put(isConnecting());
  const {
    payload: { password, token, cb },
  } = action;
  try {
    const res = yield call(Auth.setPassword, { password, token });

    if (res.data.status === 'failed') {
      yield put(setPasswordFail(res.message));
    }
    if (cb) {
      cb(true);
    }
    yield put(isEndConnecting());
  } catch (err) {
    alert(err.response.data.message);
    yield put(setPasswordFail(err.response.data.message));
    yield put(isEndConnecting());
  }
}
export default function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, signInSaga);
  yield takeLatest(LOGOUT_REQUEST, signOutSaga);
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(SET_PASSWORD, setPasswordSaga);
}
