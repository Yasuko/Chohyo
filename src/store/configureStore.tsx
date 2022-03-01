import { configureStore } from "@reduxjs/toolkit";
import { reducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from 'redux-logger';
import rootSaga from '../task/index_task';

export const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware, loggerMiddleware]
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

