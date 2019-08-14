import { put, call, takeLatest } from 'redux-saga/effects';
/* eslint import/no-cycle: 0 */
import { Leads } from 'api';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import { GET_LEAD_BY_ID_REQUEST } from './constant';
import { getLeadByIdSuccess, getLeadByIdFailure } from './actions';

function* getLeadByIdSaga({ payload }) {
  yield put(isConnecting());
  try {
    const res = yield call(Leads.getLeadById, payload);
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
