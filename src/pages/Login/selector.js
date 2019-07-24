import { createSelector } from 'reselect';

const getRoot = state => state.get('rootReducer');
export const getUser = createSelector(
  getRoot,
  item => item.get('user'),
);
export default {};
