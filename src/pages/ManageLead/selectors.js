import { createSelector } from 'reselect';

const manageLeadReducer = state => state.get('manageLeadReducer');

export const getFetchingState = createSelector(
  manageLeadReducer,
  fetching => fetching.get('isFetching'),
);

export const getLeadsState = createSelector(
  manageLeadReducer,
  dataLeads => dataLeads.get('dataLeads'),
);

export const getLeadState = createSelector(
  manageLeadReducer,
  lead => lead.get('lead'),
);

export const getBranchesState = createSelector(
  manageLeadReducer,
  branches => branches.get('branches'),
);

export default {};
