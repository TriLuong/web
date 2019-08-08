import { createSelector } from 'reselect';

const manageUserReducer = state => state.get('manageUserReducer');

export const getFetchingState = createSelector(
  manageUserReducer,
  fetching => fetching.get('isFetching'),
);

export const getUsersState = createSelector(
  manageUserReducer,
  dataUsers => dataUsers.get('dataUsers'),
);

export const getBranchesState = createSelector(
  manageUserReducer,
  branches => branches.get('branches'),
);
