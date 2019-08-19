import { createSelector } from 'reselect';

const meetingInfoReducer = state => state.get('meetingInfoReducer');

export const getFetchingState = createSelector(
  meetingInfoReducer,
  fetching => fetching.get('isFetching'),
);

export const getLeadByIdState = createSelector(
  meetingInfoReducer,
  lead => lead.get('lead'),
);

export default {};
