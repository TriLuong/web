import { put, takeLatest } from 'redux-saga/effects';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import {
  getLeadsSuccess,
  getLeadsFailure,
  deleteLeadSuccess,
  deleteLeadFailure,
  getLeadSuccess,
  getLeadFailure,
} from './actions';
import { GET_LEADS_REQUEST, DELETE_LEAD_REQUEST, GET_LEAD_REQUEST } from './constants';
import data from './data';

function* getLeadsSaga({ payload }) {
  yield put(isConnecting());
  try {
    const { typeLead, filterLead } = payload;
    // console.log('payload data', payload, data);
    const leads = filterLead === 'all'
      ? data[`${typeLead}`]
      : data[`${typeLead}`].filter(lead => lead.status === filterLead);
    yield put(getLeadsSuccess(leads));
    yield put(isEndConnecting());
  } catch (error) {
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

/* eslint radix: 0 */
/* LEAD_DETAIL */
function* getLeadSaga({ payload }) {
  yield put(isConnecting());
  try {
    const { id } = payload;
    const idParse = parseInt(id);
    // console.log('getLeadSaga', id, data.qualifiedLeads);
    const lead = data.qualifiedLeads.find(item => item.id === idParse);
    console.log('getLeadSaga', lead);
    yield put(getLeadSuccess(lead));
    yield put(isEndConnecting());
  } catch (error) {
    yield put(getLeadFailure(error));
    yield put(isEndConnecting());
  }
}

export default function* manageLeadWatcher() {
  yield takeLatest(GET_LEADS_REQUEST, getLeadsSaga);
  yield takeLatest(DELETE_LEAD_REQUEST, deleteLeadSaga);
  yield takeLatest(GET_LEAD_REQUEST, getLeadSaga);
}
