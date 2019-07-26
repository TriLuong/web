import { createSelector } from 'reselect';

const rootState = state => state.get('manageUserReducer');

/* eslint import/prefer-default-export:0 */
export const getFetchingState = createSelector(
  [rootState],
  fetching => fetching.get('isFetching'),
);

export const getUsersState = createSelector(
  [rootState],
  dataUsers => dataUsers.get('dataUsers'),
);
