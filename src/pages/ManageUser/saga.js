import { put, call, takeLatest } from 'redux-saga/effects';
import { Users, User } from 'api';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  ADD_USERS_REQUEST,
  UPDATE_USERS_REQUEST,
  EDIT_PROFILE_REQUEST,
  CHANGE_PASSWORD_REQUEST,
} from './constants';
import {
  addUserSuccess,
  addUserFail,
  updateUserSuccess,
  updateUserFail,
  editProfileSuccess,
  editProfileFailure,
  changePasswordSuccess,
  changePasswordFailure,
} from './actions';

/* FOR USERS */
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

/* FOR USER */
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

function* editProfileSaga({ payload }) {
  try {
    const { form, cb } = payload;
    const res = yield call(User.updateUser, form);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    cb(true);
    yield put(editProfileSuccess(res.data.user));
  } catch (error) {
    yield put(editProfileFailure(error));
  }
}

function* changePasswordSaga({ payload }) {
  try {
    const { form, cb } = payload;
    const res = yield call(User.changePassword, form);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    cb(true);
    yield put(changePasswordSuccess(payload));
  } catch (error) {
    yield put(changePasswordFailure(error));
  }
}

export default function* getUsersWatcher() {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
  yield takeLatest(ADD_USERS_REQUEST, addUsersSaga);
  yield takeLatest(UPDATE_USERS_REQUEST, updateUsersSaga);
  yield takeLatest(EDIT_PROFILE_REQUEST, editProfileSaga);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
}
