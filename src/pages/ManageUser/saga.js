import { put, call, takeLatest } from 'redux-saga/effects';
import { Users } from 'api';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  ADD_USERS_REQUEST,
  UPDATE_USERS_REQUEST,
} from './constants';
import { addUserSuccess, addUserFail, updateUserSuccess, updateUserFail } from './actions';

function* getUsersSaga({ payload }) {
  yield put(isConnecting());
  try {
    const res = yield call(Users.getUsers, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put({ type: GET_USERS_SUCCESS, payload: res.data });
    yield put(isEndConnecting());
  } catch (error) {
    yield put({ type: GET_USERS_FAILURE, error });
    yield put(isEndConnecting());
  }
}

function* addUsersSaga({ payload }) {
  try {
    const { form, cb } = payload;
    const res = yield call(Users.addUser, form);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    cb(true);
    yield put(addUserSuccess(res.data.user));
  } catch (error) {
    yield put(addUserFail(error));
  }
}

function* updateUsersSaga({ payload }) {
  try {
    const { form, cb } = payload;
    const res = yield call(Users.updateUser, form);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    cb(true);
    yield put(updateUserSuccess(res.data.user));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

export default function* getUsersWatcher() {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(ADD_USERS_REQUEST, addUsersSaga);
  yield takeLatest(UPDATE_USERS_REQUEST, updateUsersSaga);
}
