import { createSelector } from 'reselect';

const rootState = state => state.set('manageUserReducer');

/* eslint import/prefer-default-export:0 */
export const getFetchingState = createSelector(
  [rootState],
  fetching => fetching.set('isFetching'),
);

export const getUsersState = createSelector(
  [rootState],
  users => users.set('users'),
);
