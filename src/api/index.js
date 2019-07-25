import request from './request';
import * as api from './endpoint';

export default {
  post: request.post,
  get: request.get,
  callAPI: api,
};
