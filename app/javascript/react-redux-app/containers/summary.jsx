import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScrollData } from "scroll-data-hook";

import { createCall, fetchCall } from '../actions'

import CallNavigation from '../components/callNavigation'
import PageHeader from '../components/pageHeader'
import OutlineItem from '../components/in-call/outlineItem'

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

  startCall = () => {
    // this is where the Action has to be called and the API has to create a call
    // then do the following
    this.props.createCall(this.props.call.playbook_id)
    .then((r) => {
      console.log(r)
      this.props.history.push(`/calls/${r.payload.id}/playbooks/${this.props.call.playbook.id}/sections/${this.props.call.playbook.sections[0].id}`)
    })
  }


  endCall = () => {
    // this.saveSummary().then go to summary
    this.props.history.push(`/playbooks`)
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

  onInputChange = (content_block, event) => {
    event.preventDefault()
    let copiedContentBlock = content_block
    content_block.summary_item.simple_answer_attributes.content = event.target.value
    this.updateContentBlock(copiedContentBlock)
  }

  onSelectChange = (content_block, content_option_id) => {
    let copiedContentBlock = content_block
    content_block.summary_item.content_options_summary_items_attributes.content_option_id = content_option_id
    this.updateContentBlock(copiedContentBlock)
  }

  onMultiSelectChange = (content_block, content_option_id) => {
    let copiedContentBlock = content_block
    let copiedContentOptionsAttributes = content_block.summary_item.content_options_attributes

    if (copiedContentOptionsAttributes.includes(content_option_id)) {
      optionIndex = copiedContentOptionsAttributes.findIndex(option => option === content_option_id)
      copiedContentOptionsAttributes.slice(optionIndex, 1)
    } else{
      copiedContentOptionsAttributes.push(content_option_id)
    }

    copiedContentBlock = {
      ...copiedContentBlock,
      summary_item: {
        ...copiedContentBlock.summary_item,
        content_options_attributes: copiedContentOptionsAttributes
      }
    }
    this.updateContentBlock(copiedContentBlock)
  }

  render() {
    const call_summary = this.props.callSummary
    console.log('call_summary', call_summary)
    const content_blocks = this.state.content_blocks
    console.log(content_blocks)
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
              <button className="secondary outline" onClick={this.startCall}>Restart</button>
              <button className="secondary" onClick={this.endCall}>Save & Exit</button>
            </div>
        </PageHeader>
        <div className="page-content-wrapper row-2 a-fr">
          <div className="page-content-container">
            <div className="script-wrapper">
              {
                content_blocks &&
                  content_blocks.map((content_block) => {
                    switch (content_block.content_type.group) {
                      case 'multiselect':
                        return <OutlineItem content_block={content_block} form_value={content_block.summary_item.content_options_summary_items_items_attributes} key={content_block.id} onMultiSelectChange={this.onMultiSelectChange} />
                        break;
                      case 'select':
                        return <OutlineItem content_block={content_block} form_value={content_block.summary_item.content_options_summary_items_attributes.content_option_id} key={content_block.id} onSelectChange={this.onSelectChange} />
                        break;
                      case 'list':
                        return <OutlineItem content_block={content_block} key={content_block.id} />
                        break;
                      case 'input':
                        return <OutlineItem content_block={content_block} form_value={content_block.summary_item.simple_answer_attributes.content} key={content_block.id} onInputChange={this.onInputChange} />
                        break;
                      default:
                        return <OutlineItem content_block={content_block} key={content_block.id} />
                    }
                  })
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
  return bindActionCreators({ createCall, fetchCall }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

