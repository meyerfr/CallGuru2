import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CallGuruApp from '../components/callGuruApp';
import PlaybooksIndex from './playbooksIndex';
import Settings from '../components/settings';
import TeamsIndex from '../components/teamsIndex';
import KnowledgeIndex from '../components/knowledgeIndex';
import Insights from '../components/insights';
import PageHeader from '../components/pageHeader';
import Backlog from './backlog';
import CompanyShow from './companyShow';
import InCallPage from './inCallPage';
import Summary from './summary';

import EditSection from '../create-process/editSection'
import Sidebar from '../components/sidebar'



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
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={props => [
                <Sidebar currentUser={this.props.currentUser} key="Sidebar" />,
                <PlaybooksIndex {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              ]}
            />
            <Route
              path="/playbooks/:playbook_id/sections/:id"
              render={props => (
                <EditSection {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              )}
            />
            <Route
              path="/calls/:call_id/playbooks/:playbook_id/sections/:id"
              render={props => (
                <InCallPage {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              )}
            />
            <Route
              path="/calls/:call_id"
              render={props => (
                <Summary {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              )}
            />
            <Route
              path="/knowledge"
              render={props => [
                <Sidebar currentUser={this.props.currentUser} key="Sidebar" />,
                <KnowledgeIndex {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              ]}
            />
            <Route
              path="/teams"
              render={props => [
                <Sidebar currentUser={this.props.currentUser} key="Sidebar" />,
                <TeamsIndex {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              ]}
            />
            <Route
              path="/insights"
              render={props => [
                <Sidebar currentUser={this.props.currentUser} key="Sidebar" />,
                <Insights {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              ]}
            />
            <Route
              path="/settings"
              render={props => [
                <Sidebar currentUser={this.props.currentUser} key="Sidebar" />,
                <Settings {...props} key="component" loggedInStatus={this.state.isLoggedIn} currentUser={this.props.currentUser} />
              ]}
            />
            <Route
              path="/backoffice"
              render={props => [
                <Sidebar currentUser={this.props.currentUser} key="Sidebar" />,
                <Backlog {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              ]}
            />
{/*            <Route
              path="backoffice/companies/:id"
              render={props => [
                <Sidebar currentUser={this.props.currentUser} key="Sidebar" />,
                <CompanyShow {...props} key="component" loggedInStatus={this.state.isLoggedIn} />
              ]}
            />*/}
            <Route
              path="/users/invitation/accept"
              render={props => [
                <Sidebar currentUser={this.props.currentUser} key="Sidebar" />,
                <LogIn {...props} key="component" loggedInStatus={this.state.isLoggedIn} acceptInvite={this.acceptInvite} />
              ]}
            />
          </Switch>
        </BrowserRouter>
      </div>
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
