import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { userInfoReducer } from './reducers';
import rootSaga from './rootSaga';
import history from '../utils/history';

const sagaMiddleware = createSagaMiddleware();
const rootReducers = combineReducers({
  userInfoReducer,
  router: connectRouter(history),
});

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
);
store.runSaga = sagaMiddleware.run(rootSaga);

export default store;
