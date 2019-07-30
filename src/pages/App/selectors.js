import { createSelector } from 'reselect';

const selectRootReducer = state => state.get('rootReducer');
export const makeGetUser = () => createSelector(
  selectRootReducer,
  rootReducer => (rootReducer.get('user').toJS ? rootReducer.get('user').toJS() : rootReducer.get('user') || null),
);

export default {};
