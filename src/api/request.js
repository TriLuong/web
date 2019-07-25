import axios from 'axios';

const ROOT_API_URL = process.env.REACT_APP_REST_API_API || 'https://designcafe-backend.herokuapp.com/api/v1';
// const ROOT_API_URL = process.env.REACT_APP_REST_API_API || 'http://10.0.0.25:3009/api/v1';

const constructUrlEndPoint = api => `${ROOT_API_URL}/${api}`;
const formatStringUrl = (...args) => {
  let i = 1;
  const str = args[0];
  return str.replace(/\{\}/g, () => args[i++]); // eslint-disable-line
};

const prettifyEndpoint = (api, ...args) => formatStringUrl(constructUrlEndPoint(api), ...args);

const postReq = (url, params, config) => axios.post(prettifyEndpoint(url), params, config);

export default {
  post: postReq,
};
