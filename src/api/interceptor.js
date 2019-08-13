import axios from 'axios';
import { requestLogout } from 'pages/Login/actions';
import { store } from '../index';

// Add a response interceptor

axios.interceptors.response.use(
  response => response,
  error => {
    const {
      response: { status },
    } = error;
    if (status === 401) {
      store.dispatch(requestLogout());
    }
    Promise.reject(error);
  },
);
