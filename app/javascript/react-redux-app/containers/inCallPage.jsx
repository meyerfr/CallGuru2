import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useScrollData } from "scroll-data-hook";

import { fetchPlaybook, fetchCall, updateCallState } from '../actions'

import CallNavigation from '../components/callNavigation'
import PageHeader from '../components/pageHeader'
import OutlineItem from '../components/in-call/outlineItem'

import CallGuruLogo from '../../../assets/images/callguru_favicon.svg'

class InCallPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    if (this.props.playbook == undefined) {
      this.props.fetchPlaybook(this.props.match.params.playbook_id)
    }

    if (this.props.call == undefined) {
      this.props.fetchCall(this.props.match.params.call_id)
    } else{
      this.setState({
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

  componentDidUpdate(prevProps, prevState) {
    // this will be the place to update CallSummaryItem and send all updates to the localStorage or Database, but definitly to ReduxState
    if (this.props.selectedSection && this.props.selectedSection.id !== prevProps.selectedSection?.id) {
      this.setState({
        selectedSection: this.props.selectedSection
      }, () => {
        if (prevProps.call !== null) {
          const prevSelectedSection = prevState.selectedSection

          let summaryItems = []
          prevSelectedSection.outlines.forEach((outline) => {
            outline.content_blocks.forEach((block) => {
              if (block.content_type.form_input) {
                summaryItems.push(block.summary_item)
              }
            })
          })

          if (summaryItems.length > 0) {
            const body = {
              call: {
                summary_items_attributes: summaryItems
              }
            }
            this.props.updateCallState(this.props.call.id, prevState.selectedSection, body)
          }

        }
      })
    }
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
      case (key == 38):
        const prevSectionId = this.getPrevSectionId()
        prevSectionId != this.props.selectedSection.id && this.props.history.push(this.url(prevSectionId))
        // document.querySelector('a.arrow.prev').click()
        break;
      case (key == 40):
        const nextSectionId = this.getNextSectionId()
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
    this.props.history.push(`/calls/${this.props.call.id}`)
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
    const playbook = this.props.playbook
    const sections = this.props.sections
    const selectedSection = this.state.selectedSection
    console.log(selectedSection)
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
            <h6 className="medium">Call Name</h6>
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
                        outline.content_blocks.map((content_block, index) => {

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
  return bindActionCreators({ fetchPlaybook, fetchCall, updateCallState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InCallPage);

