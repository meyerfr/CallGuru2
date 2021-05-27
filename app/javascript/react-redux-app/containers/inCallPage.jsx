import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fetchPlaybook, fetchCall, updateCallName, updateCallState } from '../actions'

import { getPrevSectionId, getNextSectionId } from '../helper-methods/callMethods'

import CallNavigation from '../components/callNavigation'
import PageHeader from '../components/pageHeader'
import ContentBlocks from './contentBlocks'

import CallGuruLogo from '../../../assets/images/callguru_favicon.svg'

class InCallPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      callName: ''
    }
  }

  componentDidMount() {
    // if (this.props.playbook == undefined) {
    //   this.props.fetchPlaybook(this.props.match.params.playbook_id)
    // }

    if (this.props.call == undefined) {
      this.props.fetchCall(this.props.match.params.call_id)
      .then(() => this.setState({
          callName: this.props.call.name || ''
        })
      )
    } else{
      this.setState({
        callName: this.props.call.name || '',
        selectedSection: this.props.selectedSection
      })
    }

    window.addEventListener("keydown", this.handleKeyDown)
  }

  updateContentBlock = (updatedContentBlock) => {
    let copiedSelectedSection = this.state.selectedSection
    let copiedOutlines = copiedSelectedSection.outlines.slice(0)
    let outlineIndex = copiedOutlines.findIndex(outline => outline.id == updatedContentBlock.contentable_id)

    // debugger
    let copiedContentBlocks = copiedOutlines[outlineIndex].content_blocks.slice(0)
    let contentBlockIndex = copiedContentBlocks.findIndex(content_block => content_block.id == updatedContentBlock.id)
    copiedContentBlocks[contentBlockIndex] = updatedContentBlock

    copiedOutlines[outlineIndex].content_blocks = copiedContentBlocks

    copiedSelectedSection.outlines = copiedOutlines
    // debugger
    this.setState({
      selectedSection: copiedSelectedSection
    })
  }

  updateCallState = (prevState) => {
    const prevSelectedSection = prevState.selectedSection
    const copiedContentBlocks = []

    prevSelectedSection.outlines.forEach((outline) => {
      copiedContentBlocks.push(...outline.content_blocks)
    })
    this.props.updateCallState(copiedContentBlocks, this.props.call.id)
  }

  componentDidUpdate(prevProps, prevState) {
    // this will be the place to update CallSummaryItem and send all updates to the localStorage or Database, but definitly to ReduxState
    if (this.props.selectedSection && this.props.selectedSection.id !== prevProps.selectedSection?.id) {
      this.setState({
        selectedSection: this.props.selectedSection
      }, () => {
        if (prevProps.call !== null) {
          this.updateCallState(prevState)
        }
      })
    }
  }

  updateCallName = (event) => {
    this.props.updateCallName(this.props.call.id, this.props.call.name)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    let key = event.keyCode
    const playbook_id = this.props.match.params.playbook_id
    switch (true) {
      case (key == 38):
        const prevSectionId = getPrevSectionId(this.props.match.params.id, this.props.sections)
        prevSectionId != this.props.selectedSection.id && this.props.history.push(this.url(prevSectionId))
        // document.querySelector('a.arrow.prev').click()
        break;
      case (key == 40):
        const nextSectionId = getNextSectionId(this.props.match.params.id, this.props.sections)
        nextSectionId != this.props.selectedSection.id && this.props.history.push(this.url(nextSectionId))
        // document.querySelector('a.arrow.next').click()
        break;
    }
  }

  url = section_id => {
    return `/calls/${this.props.match.params.call_id}/playbooks/${this.props.match.params.playbook_id}/sections/${section_id}`
  }

  endCall = () => {
    // this.saveSummary().then go to summary
    this.updateCallState(this.state)
    this.props.history.push(`/calls/${this.props.call.id}`)
  }

  render() {
    const playbook = this.props.playbook
    const sections = this.props.sections
    const selectedSection = this.state.selectedSection
    return[
      <CallNavigation key="callNavigation" sections={sections} url={this.url} />,
      <div className="app-wrapper in-call" key="inCall">
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
            <input className="medium" value={this.state.callName} placeholder="Customer Name" onChange={(e) => this.setState({callName: e.target.value})} onBlur={(e) => this.props.call.name !== this.state.callName && this.props.updateCallName(this.props.call.id, this.state.callName)}></input>
            <div className="actions">
              <button className="secondary" onClick={this.endCall}>End Call</button>
            </div>
        </PageHeader>
        <div className="page-content-wrapper row-2 a-fr">
          <div className="page-content-container">
            <div className="outline-item section-wrapper">
              <h5 className="bold outline-title">{selectedSection?.title}</h5>
            </div>
            <div className="script-wrapper">
              {
                selectedSection &&
                selectedSection.outlines.map((outline, index) => {
                  return(
                    <div key={outline.id} className="outline-item">
                      <span className="outline-title large bold">{outline.title}</span>
                      {
                        outline.content_blocks &&
                        <ContentBlocks content_blocks={outline.content_blocks} updateContentBlock={this.updateContentBlock} />
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="in-call-actions outline-item">
            <div className="right-actions">
              <img src={CallGuruLogo} alt="CallGuru Logo" onClick={this.endCall}/>
            </div>
          </div>
        </div>
      </div>
    ];
  }
};

function mapStateToProps(state, ownProps) {
  if (state.call) {
    const playbook = state.call.playbook
    const sections = playbook.sections
    const sectionId = ownProps.match.params.id;
    return {
      playbook: playbook,
      sections: sections,
      selectedSection: sections.find((section) => section.id == sectionId),
      call: state.call
      // callSummary: state.callSummary
    }
  }else{
    return {
      call: state.call
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlaybook, fetchCall, updateCallName, updateCallState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InCallPage);

