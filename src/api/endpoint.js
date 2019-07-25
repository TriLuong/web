import axios from 'axios';
import Request from './request';

axios.defaults.withCredentials = true;

/* eslint import/prefer-default-export: 0 */
export const login = ({ username, secret }) => Request.post('SION/login', JSON.stringify({ loginemail: username, secret }), {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});
