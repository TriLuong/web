import { takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './constants';
import { logInSaga } from './Login/saga';

function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, logInSaga);
}

export default rootSaga;
