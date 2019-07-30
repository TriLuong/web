import { createSelector } from 'reselect';

const selectRootReducer = state => state.get('loaderReducer');
export const makeGetLoading = () => createSelector(
  selectRootReducer,
  rootReducer => rootReducer.get('isFetching'),
);

export default {};
