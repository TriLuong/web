import { API_URL } from './config';

export const endPoints = {
  login: 'login',
  users: 'users',
};

export const getEndPoint = name => `${API_URL}/${endPoints[name]}`;
