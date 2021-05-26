import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScrollData } from "scroll-data-hook";

import { createCall, fetchCall, updateCallState } from '../actions'

import { startCall } from '../helper-methods/callMethods'

import CallNavigation from '../components/callNavigation'
import PageHeader from '../components/pageHeader'
import ContentBlocks from './contentBlocks'

import CallGuruLogo from '../../../assets/images/callguru_favicon.svg'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    if (this.props.callSummary == undefined) {
      this.props.fetchCall(this.props.match.params.call_id)
    } else{
      this.setState({
        content_blocks: this.props.callSummary.summaryContentBlocks
      })
    }

    // window.addEventListener("keydown", this.handleKeyDown)
  }

  componentDidUpdate(prevProps, prevState) {
    // debugger
    if (prevProps.callSummary == null) {
      console.log('setState')
      this.setState({
        content_blocks: this.props.callSummary.summaryContentBlocks
      })
    }
  }

  updateContentBlock = (updatedContentBlock) => {
    let copiedContentBlocks = this.state.content_blocks
    let contentBlockIndex = copiedContentBlocks.findIndex(content_block => content_block.id == updatedContentBlock.id)
    copiedContentBlocks[contentBlockIndex] = updatedContentBlock
    // debugger
    this.setState({
      content_blocks: copiedContentBlocks
    })
  }

  endCall = () => {
    this.props.updateCallState(this.state.content_blocks, this.props.match.params.call_id)
    this.props.history.push(`/playbooks`)
  }

  render() {
    const content_blocks = this.state.content_blocks
    return[
      <CallNavigation key="callNavigation" />,
      <div className="app-wrapper in-call" key="inCall">
        <PageHeader key="PageHeader" page="Call Summary">
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
            <div className="actions">
              <button className="secondary outline" onClick={() => startCall(this.porps.call.playbook_id, this.props.createCall, this.props.history)}>Restart</button>
              <button className="secondary" onClick={this.endCall}>Save & Exit</button>
            </div>
        </PageHeader>
        <div className="page-content-wrapper row-2 a-fr">
          <div className="page-content-container">
            <div className="script-wrapper">
              {
                content_blocks &&
                  <ContentBlocks content_blocks={content_blocks} updateContentBlock={this.updateContentBlock} />
              }
            </div>
          </div>
        </div>
      </div>
    ];
  }
};

function mapStateToProps(state, ownProps) {
  return {
    call: state.call,
    callSummary: state.callSummary
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createCall, fetchCall, updateCallState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

