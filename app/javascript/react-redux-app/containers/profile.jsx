import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import PageHeader from '../components/pageHeader'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { logoutUser } from '../actions'

class Profile extends Component {
  logout = (callback) => {
    this.props.logoutUser().then(() => console.log('logOut'))
    .then(() => window.location.href = "http://localhost:3000")
  }


  render() {
    return (
      <div className="app-wrapper profile">
        <PageHeader key="PageHeader" page="Profile">
          {
            // <div className="tabs">
            //   <NavLink activeClassName="active" className="tab" to={`/playbooks`}>
            //     <span className="normal bold">Tab 1</span>
            //   </NavLink>
            //   <NavLink activeClassName="active" className="tab" to={`/playbooks?tab2`}>
            //     <span className="normal bold">Tab 2</span>
            //   </NavLink>
            //   <NavLink activeClassName="active" className="tab" to={`/playbooks?tab3`}>
            //     <span className="normal bold">Tab 3</span>
            //   </NavLink>
            // </div>
            // <div className="actions">
            //   <button>Action</button>
            // </div>
          }
        </PageHeader>
        <div className="page-content-wrapper row-2 fr-a medium">
          <div className="page-content-container">
            <div className="list">
              <div className="content-item">
                <FontAwesomeIcon icon={faUser} />
                <button className="outline primary small-btn medium">change Avatar</button>
              </div>
              <div className="seperater"></div>
              <div className="content-item">
                <span className="large bold">Personal Info</span>
                <span className="normal bold">fritz.meyer@callguru.de</span>
                <div className="d-flex">
                  <span className="normal bold">Fritz</span>
                  <span className="normal bold">Meyer</span>
                </div>
              </div>
              <div className="seperater"></div>
              <div className="content-item">
                <span className="large bold">Password</span>
                <button className="outline primary small-btn medium">change Password</button>
              </div>
              <div className="seperater"></div>
              <div className="content-item">
                <span className="large bold">Log out</span>
                <span className="normal">You will be logged out of all other active sessions besides this one and will have to log back in</span>
                <button className="outline secondary small-btn medium" onClick={this.logout}>Log out</button>
              </div>
            </div>
          </div>
          <div className="page-content-actions-wrapper">
            <div className="seperater"></div>
            <div className="page-content-actions-container">
              <button className="primary normal bold">Save</button>
              <button className="primary normal bold outline">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
