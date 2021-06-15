import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

import { fetchPlaybooks, createCall } from '../actions'

import { startCall } from '../helper-methods/callMethods'

import PageHeader from '../components/pageHeader'
import PlaybookCard from '../components/playbookCard'

import PlaybookModal from '../components/playbookModal'

// import playbooks from '../db/playbooks'

class PlaybooksIndex extends Component {
  constructor(props){
    super(props)
    this.state = {
      showModal: false
    }
  }

  componentDidMount() {
    if (this.props.playbooks.length === 0) {
      this.props.fetchPlaybooks(this.props.currentUser.company_id)
    }
  }

  toggleModal = (playbook) => {
    this.setState({
      showModal: !this.state.showModal,
      modalPlaybook: playbook
    })
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
          <div className="page-content-container">
            <div className="search-form-control form-group">
              <input className="form-control string required" placeholder="Search for Playbook" type="text" name="search[query]" id="search_query" />
              <button name="button" type="submit" className="btn btn-flat">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="wrapped-list">
              {
                playbooks &&
                playbooks.map((playbook, index) => <PlaybookCard key={index} playbook={playbook} onClick={() => this.toggleModal(playbook)} />)
              }
            </div>
            <PlaybookModal show={this.state.showModal} onClick={this.toggleModal} history={this.props.history} createCall={this.props.createCall} playbook={this.state.modalPlaybook} />
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
  return bindActionCreators({ fetchPlaybooks, createCall }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaybooksIndex);

