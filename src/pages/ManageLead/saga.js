import { put, call, takeLatest } from 'redux-saga/effects';
/* eslint import/no-cycle: 0 */
import { Leads } from 'api';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import {
  getLeadsSuccess,
  getLeadsFailure,
  deleteLeadSuccess,
  deleteLeadFailure,
  updateLeadFailure,
} from './actions';
import { GET_LEADS_REQUEST, DELETE_LEAD_REQUEST, UPDATE_LEAD_REQUEST } from './constants';
import data from './data';

function* getLeadsSaga({ payload }) {
  yield put(isConnecting());
  try {
    // const leads = filter === 'all'
    //   ? data[`${status}`]
    //   : data[`${status}`].filter(lead => lead.status === filter);
    // yield put(getLeadsSuccess(leads));
    const res = yield call(Leads.getLeads, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put(getLeadsSuccess(res.data));
    yield put(isEndConnecting());
  } catch (error) {
    alert(error.response.data.message);
    yield put(getLeadsFailure(error));
    yield put(isEndConnecting());
  }
}

function* deleteLeadSaga({ payload }) {
  yield put(isConnecting());
  try {
    const { lead, filter, status } = payload;
    const leads = filter === 'all'
      ? data[`${status}`]
      : data[`${status}`].filter(item => item.status === filter);
    const leadDeleteIdex = leads.findIndex(item => item.id === lead.id);
    leads.splice(leadDeleteIdex, 1);
    yield put(deleteLeadSuccess(leads));
    yield put(isEndConnecting());
  } catch (error) {
    yield put(deleteLeadFailure(error));
    yield put(isEndConnecting());
  }
}

/* eslint radix: 0 */
/* LEAD_DETAIL */
function* updateLeadSaga({ payload }) {
  yield put(isConnecting());
  try {
    const res = yield call(Leads.updateLead, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put(isEndConnecting());
  } catch (error) {
    yield put(updateLeadFailure(error));
    yield put(isEndConnecting());
  }
}

export default function* manageLeadWatcher() {
  yield takeLatest(GET_LEADS_REQUEST, getLeadsSaga);
  yield takeLatest(DELETE_LEAD_REQUEST, deleteLeadSaga);
  yield takeLatest(UPDATE_LEAD_REQUEST, updateLeadSaga);
}
