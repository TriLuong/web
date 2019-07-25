import { put, call, takeLatest } from 'redux-saga/effects';
import API from 'api';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from './constants';

function* getUsersSaga() {
  try {
    let res = null;
    res = yield call(API.callAPI.getUsers);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put({ type: GET_USERS_SUCCESS, payload: res.data.users });
  } catch (error) {
    yield put({ type: GET_USERS_FAILURE, error });
  }
}

export default function* getUsersWatcher() {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
}
