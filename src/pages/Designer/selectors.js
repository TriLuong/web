import { createSelector } from 'reselect';

const leadsScheduledReducer = state => state.get('leadsScheduledReducer');

export const getFetchingState = createSelector(
  leadsScheduledReducer,
  fetching => fetching.get('isFetching'),
);

export const getLeadsScheduledState = createSelector(
  leadsScheduledReducer,
  leads => leads.get('leadsScheduled'),
);

export default {};
