import { put, call, takeLatest } from 'redux-saga/effects';
import { Users } from 'api';
import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE, ADD_USERS_REQUEST } from './constants';
import { adddUsersSuccess, addUsersFail } from './actions';

function* getUsersSaga({ payload }) {
  try {
    const res = yield call(Users.getUsers, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put({ type: GET_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    yield put({ type: GET_USERS_FAILURE, error });
  }
}

function* addUsersSaga({ payload }) {
  try {
    const { form, cb } = payload;
    let res = null;
    res = yield call(Users.addUsers, form);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put(adddUsersSuccess(res.data.user));
    cb(true);
  } catch (error) {
    yield put(addUsersFail(error));
    // cb(false);
  }
}

export default function* getUsersWatcher() {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(ADD_USERS_REQUEST, addUsersSaga);
}
