import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import rootReducers from './reducers';

import App from './components/app';

const reactReduxApp = document.getElementById('react_redux_app');

const initialState = {
  // someAttribute: JSON.parse(reactReduxApp.dataset.someAttribute).map(c => c.name)
};

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(rootReducers, initialState, middlewares);

console.log('hello react app')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  reactReduxApp
);
