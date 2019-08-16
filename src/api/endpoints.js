import { API_URL } from './config';

export const endPoints = {
  auth: { login: 'auth', resetPassword: 'auth/password-reset', setPassword: 'auth/password-set' },
  users: 'users',
  user: 'user',
  branches: 'branches',
  leads: 'leads',
  designer: 'designer',
};

export const getEndPoint = endpoint => `${API_URL}/${endpoint}`;
