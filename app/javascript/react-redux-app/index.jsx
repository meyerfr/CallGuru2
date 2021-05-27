import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import rootReducers from './reducers';

import App from './containers/app'
// import CallGuruApp from './components/callGuruApp';
// import PlaybooksIndex from './components/playbooksIndex';
// import Settings from './components/settings';
// import TeamsIndex from './components/teamsIndex';
// import KnowledgeIndex from './components/knowledgeIndex';
// import Profile from './components/profile';
// import Insights from './components/insights';
// import AppNavigation from './containers/appNavigation';
// import PageHeader from './components/pageHeader';

const reactReduxApp = document.getElementById('react_redux_app');

const initialState = {
  // someAttribute: JSON.parse(reactReduxApp.dataset.someAttribute).map(c => c.name)
  currentUser: JSON.parse(reactReduxApp.dataset.current_user),
  companies: [],
  playbooks: [],
  sections: [],
  call: null,
  callSummary: null,
  contentTypes: []
};

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(rootReducers, initialState, middlewares);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  reactReduxApp
);
