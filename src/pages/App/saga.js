import { put, call, takeLatest } from 'redux-saga/effects';
import { Branches } from 'api';
import { getBranchesSuccess, getBranchesFailure } from './actions';
import { GET_BRANCHES_REQUEST } from './constants';

function* getBranchesSaga({ payload }) {
  try {
    const res = yield call(Branches.getBranches, payload);
    if (res.data.status === 'failed') {
      throw new Error(res.message);
    }
    yield put(getBranchesSuccess(res.data.branches));
  } catch (error) {
    yield put(getBranchesFailure(error));
  }
}

export default function* manageLeadWatcher() {
  yield takeLatest(GET_BRANCHES_REQUEST, getBranchesSaga);
}
