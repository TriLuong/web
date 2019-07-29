import { API_URL } from './config';

export const endPoints = {
  auth: { login: 'auth/login' },
  users: 'users',
  user: 'user',
};

export const getEndPoint = endpoint => `${API_URL}/${endpoint}`;
