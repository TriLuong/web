import { createSelector } from 'reselect';

const leadDetailReducer = state => state.get('leadDetailReducer');

export const getFetchingState = createSelector(
  leadDetailReducer,
  fetching => fetching.get('isFetching'),
);

export const getLeadByIdState = createSelector(
  leadDetailReducer,
  lead => lead.get('lead'),
);
