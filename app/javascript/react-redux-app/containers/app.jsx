import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CallGuruApp from '../components/callGuruApp';
import PlaybooksIndex from './playbooksIndex';
import Settings from '../components/settings';
import TeamsIndex from '../components/teamsIndex';
import KnowledgeIndex from '../components/knowledgeIndex';
import Profile from './profile';
import Insights from '../components/insights';
import AppNavigation from './appNavigation';
import PageHeader from '../components/pageHeader';
import Backlog from './backlog';
import CompanyShow from './companyShow';
import InCallPage from './inCallPage';
import Summary from './summary';


import { logoutUser } from '../actions'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: true
    }
  }

  acceptInvite = (callback) => {
    this.props.acceptInvite((r) => {
      this.setState = {
        isLoggedIn: true
      }
    })
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route
            exact path='/'
            render={props => [
              <AppNavigation key="appNavigation" />,
              <PlaybooksIndex {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            exact path="/playbooks"
            render={props => [
              <AppNavigation key="appNavigation" />,
              <PlaybooksIndex {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            exact path="/calls/:call_id"
            render={props => (
              <Summary {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/calls/:call_id/playbooks/:playbook_id/sections/:id"
            render={props => (
              <InCallPage {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/knowledge"
            render={props => [
              <AppNavigation key="appNavigation" sections={this.props.call?.playbook.sections} />,
              <KnowledgeIndex {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            path="/teams"
            render={props => [
              <AppNavigation key="appNavigation" />,
              <TeamsIndex {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            path="/insights"
            render={props => [
              <AppNavigation key="appNavigation" />,
              <Insights {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            path="/settings"
            render={props => [
              <AppNavigation key="appNavigation" />,
              <Settings {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            path="/profile"
            render={props => [
              <AppNavigation key="appNavigation" />,
              <Profile {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            path="/backlog"
            render={props => [
              <AppNavigation key="appNavigation" />,
              <Backlog {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            path="/companies/:id"
            render={props => [
              <AppNavigation key="appNavigation" />,
              <CompanyShow {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
            ]}
          />
          <Route
            path="/users/invitation/accept"
            render={props => [
              <AppNavigation key="appNavigation" />,
              <LogIn {...props} key="component" loggedInStatus={this.state.isLoggedIn} acceptInvite={this.acceptInvite} />
            ]}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    call: state.call,
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
