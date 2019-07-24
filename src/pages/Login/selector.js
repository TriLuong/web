import { createSelector } from 'reselect';

const getRoot = state => state.get('rootReducer');
export const getUser = createSelector(
  getRoot,
  item => item.get('isFetching'),
);
export default {};
