import Request from './request';

/* eslint import/prefer-default-export: 0 */
export const login = payload => Request.post('login', payload);

export const getUser = auth => Request.get('users', auth);
