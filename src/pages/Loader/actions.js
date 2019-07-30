import { createAction } from 'redux-actions';
import { IS_CONNECTING, IS_END_CONNECTING } from './constants';

export const isConnecting = createAction(IS_CONNECTING);
export const isEndConnecting = createAction(IS_END_CONNECTING);
export default {};
