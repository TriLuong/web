import { createSelector } from 'reselect';

const manageUserReducer = state => state.get('manageUserReducer');

export const getUsersState = createSelector(
  manageUserReducer,
  dataUsers => dataUsers.get('dataUsers'),
);

export default {};
