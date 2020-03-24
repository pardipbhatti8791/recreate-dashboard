import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './rootReducer';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
const history = createBrowserHistory();

const middlewares = [thunk, logger];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    reducers(history),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}
export { history };
