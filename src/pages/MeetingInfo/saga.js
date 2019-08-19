/* eslint import/no-cycle: 0 */
import { put, call, takeLatest } from 'redux-saga/effects';
import { Designer } from 'api';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import { GET_LEAD_BY_ID_REQUEST } from './constants';
import { getLeadByIdSuccess, getLeadByIdFailure } from './actions';

function* getLeadByIdSaga({ payload }) {
  yield put(isConnecting());
  try {
    console.log(payload);
    const res = yield call(Designer.getLeadById, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put(getLeadByIdSuccess(res.data.lead));
    yield put(isEndConnecting());
  } catch (error) {
    alert(error.response.data.message);
    yield put(getLeadByIdFailure(error));
    yield put(isEndConnecting());
  }
}

export default function* leadDetailSaga() {
  yield takeLatest(GET_LEAD_BY_ID_REQUEST, getLeadByIdSaga);
}
