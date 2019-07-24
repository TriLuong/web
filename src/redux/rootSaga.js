import { takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, EDIT_PROFILE_REQUEST } from './constants';
import { logInSaga } from './Login/saga';
import { editProfileSaga } from './Header/saga';

function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, logInSaga);
  yield takeLatest(EDIT_PROFILE_REQUEST, editProfileSaga);
}

export default rootSaga;
