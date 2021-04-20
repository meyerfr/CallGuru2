import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CallGuruApp from '../components/callGuruApp';
import PlaybooksIndex from '../components/playbooksIndex';
import Settings from '../components/settings';
import TeamsIndex from '../components/teamsIndex';
import KnowledgeIndex from '../components/knowledgeIndex';
import Profile from './profile';
import Insights from '../components/insights';
import AppNavigation from './appNavigation';
import PageHeader from '../components/pageHeader';
import Backlog from './backlog';
import CompanyShow from './companyShow';

import { logoutUser } from '../actions'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: true
    }
  }

  logout = (callback) => {
    this.props.logoutUser((r) => {
      this.setState = {
        isLoggedIn: false
      }
    })
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
        <AppNavigation />
        <Switch>
          <Route
            exact path='/'
            render={props => (
              <PlaybooksIndex {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/playbooks"
            render={props => (
              <PlaybooksIndex {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/knowledge"
            render={props => (
              <KnowledgeIndex {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/teams"
            render={props => (
              <TeamsIndex {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/insights"
            render={props => (
              <Insights {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/settings"
            render={props => (
              <Settings {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/profile"
            render={props => (
              <Profile {...props} loggedInStatus={this.state.isLoggedIn} logout={this.logout} />
            )}
          />
          <Route
            path="/backlog"
            render={props => (
              <Backlog {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/companies/:id"
            render={props => (
              <CompanyShow {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route
            path="/users/invitation/accept"
            render={props => (
              <LogIn {...props} loggedInStatus={this.state.isLoggedIn} acceptInvite={this.acceptInvite} />
            )}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
