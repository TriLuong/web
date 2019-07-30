import { API_URL } from './config';

export const endPoints = {
  auth: { login: 'auth/login' },
  users: 'users',
};

export const getEndPoint = endpoint => `${API_URL}/${endpoint}`;
