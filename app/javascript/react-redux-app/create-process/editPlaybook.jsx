import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

import { fetchPlaybook } from '../actions'

import CallNavigation from '../components/callNavigation'

import PageHeader from '../components/pageHeader'
import PlaybookCard from '../components/playbookCard'

import EditSection from './editSection'

// import playbooks from '../db/playbooks'

class EditPlaybook extends Component {
  constructor(props){
    super(props)
    this.state = {
      playbook: []
    }
  }
  componentDidMount() {
    if (!this.props.playbook) {
      this.props.fetchPlaybook(this.props.match.params.playbook_id)
      // .then((r) => this.setPlaybookToState(r.payload))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playbook == null) {
      this.setPlaybookToState(this.props.playbook)
    }
  }

  setPlaybookToState = (playbook) => {
    this.setState({
      playbook: playbook
    })
  }

  updatePlaybook = () => {
    this.props.updatePlaybook(this.state.playbook)
  }

  // updatePlaybookSection = (sectionId, section) => {
  //   let copiedPlaybookState = this.state.playbook
  //   let copiedPlaybookSections = copiedPlaybookState.sections_attributes

  //   let toBeUpdatedIndex = copiedPlaybookSections.findIndex((section) => section.id === sectionId)
  //   copiedPlaybookSections[toBeUpdatedIndex] = section

  //   copiedPlaybookState.sections_attributes = copiedPlaybookSections

  //   this.setState({
  //     playbook: copiedPlaybookState
  //   })
  // }

  savePlaybook = () => {

  }

  render() {
    const playbook = this.state.playbook
    return (
      <div className="app-wrapper">
        <CallNavigation key="callNavigation" sections={playbook.sections} url={this.url} />,
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
            <div className="actions">
              <button className="secondary" onClick={this.updatePlaybook}>Save</button>
            </div>
          }
        </PageHeader>
        <div className="page-content-wrapper row-2 a-fr">
          <div className="page-content-container">
            <div className="wrapped-list">
              {
                playbook &&
                  <EditSection sectionId={this.props.match.params.id} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const playbookId = ownProps.match.params.playbook_id
  return {
    playbook: state.playbooks.find((playbook) => playbook.id === playbookId)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlaybook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlaybook);

