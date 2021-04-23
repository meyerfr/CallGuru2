import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScrollData } from "scroll-data-hook";

import { fetchPlaybook, fetchSections } from '../actions'

import PageHeader from '../components/pageHeader'
import PlaybookCard from '../components/playbookCard'
import OutlineItem from '../components/in-call/outlineItem'

import CallGuruLogo from '../../../assets/images/callguru_favicon.svg'

// import playbooks from '../db/playbooks'

class InCallPage extends Component {
  componentDidMount() {
    if (this.props.playbook == undefined) {
      this.props.fetchPlaybook(this.props.match.params.playbook_id)
    }
    this.props.fetchSections(this.props.match.params.playbook_id)
    window.addEventListener("keydown", this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  getPrevSectionId = () => {
    const currentSectionId = this.props.match.params.id
    const allSectionIds = this.props.sections.map(s => s.id);
    const currentSectionIdIdx = allSectionIds.indexOf(currentSectionId);
    const prevSectionIdIdx = currentSectionIdIdx - 1 < 0 ? 0 : currentSectionIdIdx - 1;
    const prevSectionId = this.props.sections[prevSectionIdIdx].id;
    return prevSectionId;
  }

  getNextSectionId = () => {
    const sections = this.props.sections

    const currentSectionId = this.props.match.params.id
    const allSectionIds = sections.map(s => s.id);
    const currentSectionIdIdx = allSectionIds.indexOf(currentSectionId);
    const nextSectionIdIdx = Math.min(allSectionIds.length - 1, currentSectionIdIdx + 1);
    const nextSectionId = sections[nextSectionIdIdx].id;
    return nextSectionId;
  }

  handleKeyDown = (event) => {
    let key = event.keyCode
    const playbook_id = this.props.match.params.playbook_id
    switch (true) {
      case (key == 37):
        const prevSectionId = this.getPrevSectionId()
        prevSectionId != this.props.selectedSection.id && this.props.history.push(`/playbooks/${playbook_id}/sections/${prevSectionId}`)
        // document.querySelector('a.arrow.prev').click()
        break;
      case (key == 39):
        const nextSectionId = this.getNextSectionId()
        nextSectionId != this.props.selectedSection.id && this.props.history.push(`/playbooks/${playbook_id}/sections/${nextSectionId}`)
        // document.querySelector('a.arrow.next').click()
        break;
    }
  }

  url = section_id => {
    return `/playbooks/${this.props.match.params.playbook_id}/sections/${section_id}`
  }

  endCall = () => {
    this.props.history.push(`/playbooks`)
  }

  render() {
    const playbook = this.props.playbook
    const sections = this.props.sections
    const selectedSection = this.props.selectedSection
    // console.log(this.url(sections[0]?.id))
    return (
      <div className="app-wrapper no-margin in-call">
        <div className="outline-background">
          <div className="logo center">
            <NavLink activeClassName="active" to={`/`}>
              <img src={CallGuruLogo} alt="CallGuru Logo" />
            </NavLink>
          </div>
        </div>
        <PageHeader key="PageHeader" page={playbook?.name}>
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
          }
            <h6 className="medium">Call Name</h6>
            <div className="actions">
              <button className="secondary" onClick={this.endCall}>End Call</button>
            </div>
        </PageHeader>
        <div className="page-content-wrapper row-2 a-fr">
          <div className="page-content-container">
            <div className="outline-item section-wrapper">
              <h5 className="bold">{selectedSection?.title}</h5>
              <div className="d-flex justify-between section-nav">
                {
                  sections.map((section, index) =>
                    <NavLink activeClassName="active" key={section.id} to={this.url(section.id)}>
                      <img src={CallGuruLogo} alt="CallGuru Logo" />
                    </NavLink>
                  )
                }
              </div>
            </div>
            <div className="script-wrapper">
              {
                selectedSection &&
                selectedSection.outlines.map((outline, index) =>
                  <div key={outline.id} className="outline-item">
                    <span className="outline-title">{outline.title}</span>
                    {
                      outline.content_blocks.map((content_block, index) =>
                        <OutlineItem content_block={content_block} key={content_block.id} />
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
          <div className="in-call-actions outline-item">
            <div className="left-actions"></div>
            <div className="right-actions">
              <img src={CallGuruLogo} alt="CallGuru Logo" onClick={this.endCall}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  console.log(ownProps)
  const playbookId = ownProps.match.params.playbook_id;
  const sectionId = ownProps.match.params.id;
  return {
    playbook: state.playbooks.find((playbook) => playbook.id == playbookId),
    sections: state.sections.filter((section) => section.playbook_id == playbookId),
    selectedSection: state.sections.find((section) => section.id == sectionId)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlaybook, fetchSections }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InCallPage);

