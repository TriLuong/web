import { createSelector } from 'reselect';

const selectRootReducer = state => state.get('rootReducer');
export const makeGetLoading = () => createSelector(
  selectRootReducer,
  rootReducer => rootReducer.get('isFetching'),
);

export default {};
