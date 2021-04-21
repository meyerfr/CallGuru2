import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

import { fetchPlaybooks } from '../actions'

import PageHeader from '../components/pageHeader'
import PlaybookCard from '../components/playbookCard'

// import playbooks from '../db/playbooks'

class PlaybooksIndex extends Component {
  componentDidMount() {
    if (this.props.playbooks.length === 0) {
      console.log(this.props.currentUser)
      this.props.fetchPlaybooks(this.props.currentUser.company_id)
    }
  }

  startCall = (playbook) => {
    // this is where the Action has to be called and the API has to create a call
    // then do the following
    this.props.history.push(`/playbooks/${playbook.id}/sections/${playbook.first_section_id}`);
  }

  render() {
    const playbooks = this.props.playbooks
    return (
      <div className="app-wrapper">
        <PageHeader key="PageHeader" page="Playbooks">
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
            //   <button onClick={this.action}>Action</button>
            // </div>
          }
        </PageHeader>
        <div className="page-content-wrapper row-2 a-fr">
          <div className="stretch">
            <span className="large">This is a list of all your Playbooks. Just click on “start Call” and get going. Otherwise you can also filter or query your Playbooks</span>
            <div className="filters">
              <FontAwesomeIcon icon={faSearch} />
              <FontAwesomeIcon icon={faFilter} />
            </div>
          </div>
          <div className="page-content-container">
            <div className="wrapped-list">
              <div className="card center bg-secondary action">
                <h5 className="bold">Create</h5>
                <h5 className="bold">Playbook</h5>
              </div>
              {
                playbooks &&
                playbooks.map((playbook, index) => <PlaybookCard key={index} playbook={playbook} onClick={() => this.startCall(playbook)} />)
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    playbooks: state.playbooks,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlaybooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaybooksIndex);

