// import axios from 'axios';
// // Add a response interceptor
// axios.interceptors.response.use(
//   () => {},
//   error => {
//     const {
//       response: { status },
//     } = error;
//     if (status === 401) {
//       axios.defaults.headers.common.Authorization = '';
//     }
//     Promise.reject(error);
//   },
// );