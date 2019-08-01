import { put, takeLatest } from 'redux-saga/effects';
import { isConnecting, isEndConnecting } from 'pages/Loader/actions';
import { getLeadsSuccess, getLeadsFailure } from './actions';
import { GET_LEADS_REQUEST } from './constants';
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

export default function* manageLeadWatcher() {
  yield takeLatest(GET_LEADS_REQUEST, getLeadsSaga);
}
