import { createSelector } from 'reselect';

const selectRootReducer = state => state.get('rootReducer');
export const makeGetToken = () => createSelector(
  selectRootReducer,
  rootReducer => rootReducer.get('token'),
);

export default {};
