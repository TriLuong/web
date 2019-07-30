import { API_URL } from './config';

export const endPoints = {
  auth: { login: 'auth' },
  users: 'users',
};

export const getEndPoint = endpoint => `${API_URL}/${endpoint}`;
