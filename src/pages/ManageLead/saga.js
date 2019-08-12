import { put, call, takeLatest } from 'redux-saga/effects';
import { Leads, Branches } from 'api';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import {
  getLeadsSuccess,
  getLeadsFailure,
  deleteLeadSuccess,
  deleteLeadFailure,
  getLeadByIDSuccess,
  getLeadByIDFailure,
  getBranchesSuccess,
  getBranchesFailure,
} from './actions';
import {
  GET_LEADS_REQUEST,
  DELETE_LEAD_REQUEST,
  GET_LEAD_BY_ID_REQUEST,
  GET_BRANCHES_REQUEST,
} from './constants';
import data from './data';

function* getLeadsSaga({ payload }) {
  yield put(isConnecting());
  try {
    // console.log('payload data', payload, data);
    // const leads = filterLead === 'all'
    //   ? data[`${typeLead}`]
    //   : data[`${typeLead}`].filter(lead => lead.status === filterLead);
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
    const { lead, filterLead, typeLead } = payload;
    const leads = filterLead === 'all'
      ? data[`${typeLead}`]
      : data[`${typeLead}`].filter(item => item.status === filterLead);
    const leadDeleteIdex = leads.findIndex(item => item.id === lead.id);
    leads.splice(leadDeleteIdex, 1);
    yield put(deleteLeadSuccess(leads));
    yield put(isEndConnecting());
  } catch (error) {
    yield put(deleteLeadFailure(error));
    yield put(isEndConnecting());
  }
}

function* getBranchesSaga({ payload }) {
  yield put(isConnecting());
  try {
    const res = yield call(Branches.getBranches, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put(getBranchesSuccess(res.data.branches));
    yield put(isEndConnecting());
  } catch (error) {
    alert(error.response.data.message);
    yield put(getBranchesFailure(error));
    yield put(isEndConnecting());
  }
}

/* eslint radix: 0 */
/* LEAD_DETAIL */
function* getLeadByIDSaga({ payload }) {
  yield put(isConnecting());
  try {
    yield put(getLeadByIDSuccess(payload));
    yield put(isEndConnecting());
  } catch (error) {
    yield put(getLeadByIDFailure(error));
    yield put(isEndConnecting());
  }
}

export default function* manageLeadWatcher() {
  yield takeLatest(GET_LEADS_REQUEST, getLeadsSaga);
  yield takeLatest(DELETE_LEAD_REQUEST, deleteLeadSaga);
  yield takeLatest(GET_BRANCHES_REQUEST, getBranchesSaga);
  yield takeLatest(GET_LEAD_BY_ID_REQUEST, getLeadByIDSaga);
}
