import { createSelector } from 'reselect';

const manageLeadReducer = state => state.get('manageLeadReducer');

export const getLeadsState = createSelector(
  manageLeadReducer,
  dataLeads => dataLeads.get('dataLeads'),
);

export default {};
