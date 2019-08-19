/* eslint import/no-cycle: 0 */
import { put, call, takeLatest } from 'redux-saga/effects';
import { Designer } from 'api';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import {
  getLeadsScheduledSuccess,
  getLeadsScheduledFailure,
  reScheduleLeadSuccess,
  reScheduleLeadFailure,
} from './actions';
import { GET_LEADS_SCHEDULED_REQUEST, RESCHEDULE_LEAD_REQUEST } from './constants';

function* getLeadsScheduledSaga({ payload }) {
  yield put(isConnecting());
  try {
    const res = yield call(Designer.getLeadsScheduled, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put(getLeadsScheduledSuccess(res.data));
    yield put(isEndConnecting());
  } catch (error) {
    alert(error.response.data.message);
    yield put(getLeadsScheduledFailure(error));
    yield put(isEndConnecting());
  }
}

function* reScheduleSaga({ payload }) {
  yield put(isConnecting());
  try {
    // console.log('reScheduleSaga', payload);
    const res = yield call(Designer.rescheduleLead, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    // console.log(res);
    yield put(reScheduleLeadSuccess(res.data.lead));

    yield put(isEndConnecting());
  } catch (error) {
    yield put(reScheduleLeadFailure(error));
    yield put(isEndConnecting());
  }
}

export default function* leadsScheduledWatcher() {
  yield takeLatest(GET_LEADS_SCHEDULED_REQUEST, getLeadsScheduledSaga);
  yield takeLatest(RESCHEDULE_LEAD_REQUEST, reScheduleSaga);
}
