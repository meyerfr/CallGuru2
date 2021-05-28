import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

import { fetchPlaybook, fetchContentTypes } from '../actions'
import { uuid } from './helperFunctions'

import CallNavigation from '../components/callNavigation'

import PageHeader from '../components/pageHeader'
import PlaybookCard from '../components/playbookCard'
import EditOutlineItem from './editOutlineItem'
import EditContentBlock from './editContentBlock'

// import playbooks from '../db/playbooks'

class EditSection extends Component {
  constructor(props){
    super(props)
    this.state = {
      updatedElement: null
    }
  }

  componentDidMount() {
    if (!this.props.playbook) {
      this.props.fetchPlaybook(this.props.match.params.playbook_id)
      this.props.fetchContentTypes()
      // .then((r) => this.setSectionToState(r.payload))
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   debugger
  //   return true
  // }

  componentDidUpdate(prevProps, prevState) {
    // debugger
    if (!prevProps.playbook || prevProps.section.id !== this.props.section.id) {
      this.setSectionToState(this.props.section)
    }
  }

  shouldComponentUpdate(nextProps, nextState){

    return true
  }

  setSectionToState = (section) => {
    this.setState({
      section: section
    })
  }

  updateSection = () => {
    this.props.updateSection(this.state.section)
  }

  updateSectionOutline = (outline, updatedObject=[]) => {
    let copiedSectionOutlines = this.state.section.outlines_attributes
    const outlineReactId = outline.react_id
    let toBeUpdatedOutlineIndex = copiedSectionOutlines.findIndex((outline) => outline.react_id === outlineReactId)
    copiedSectionOutlines[toBeUpdatedOutlineIndex] = outline

    let copiedSectionState = {
      ...this.state.section,
      outlines_attributes: copiedSectionOutlines
    }

    this.setState({
      updated: updatedObject,
      section: copiedSectionState
    })
  }

  // shouldComponentUpdate() {
  //   return true
  // }

  addOutlineHandler = () => {
    const contentType = this.props.contentTypes.find((type) => type.group === 'text' && type.style === 'paragraph')
    const newOutline = {
      id: null,
      title: "",
      section_id: this.props.section.id,
      content_blocks_attributes: [
        {
          id: null,
          contentable_type: "Outline",
          contentable_id: null,
          content_type_id: contentType.id,
          text: "",
          order_no: null,
          content_options_attributes: [],
          _destroy: "1",
          react_id: uuid(),
          content_type: contentType
        }
      ],
      _destroy: "1",
      react_id: uuid()
    }

    let newOutlines = this.state.section.outlines_attributes

    newOutlines.push(newOutline)

    this.setState({
      ...this.state,
      section: {
        ...this.state.section,
        outlines_attributes: newOutlines
      }
    })
  }

  url = section_id => {
    return `/playbooks/${this.props.match.params.playbook_id}/sections/${section_id}`
  }

  updateContentBlock = (contentBlock, updatedObject) => {
    let copiedOutlineContentBlocks = this.props.section.content_blocks_attributes
    let contentBlockReactId = contentBlock.react_id
    let toBeUpdatedContentBlockIndex = copiedOutlineContentBlocks.findIndex((block) => block.react_id === contentBlockReactId)
    copiedOutlineContentBlocks[toBeUpdatedContentBlockIndex] = contentBlock
    this.setState({
      ...this.state,
      section: {
        ...this.state.section,
        content_blocks_attributes: copiedOutlineContentBlocks
      },
      updatedElement: updatedObject
    })
  }

  onNameUpdate = (e) => {
    this.props.updateSectionOutline({...this.props.outline, title: e.target.value}, {outline_id: this.props.outline.id})
  }


  addBlockHandler = (currentBlock) => {
    const contentType = this.props.contentTypes.find((type) => type.group === 'text' && type.style === 'paragraph')
    const newBlock = {
      id: null,
      contentable_type: 'Outline',
      contentable_id: this.props.outline.id,
      content_type_id: contentType.id,
      text: '',
      order_no: null,
      content_blocks_attributes: [],
      _destroy: '1',
      react_id: uuid(),
      content_type: contentType
    }
    const copiedOutlineContentBlocks = this.props.outline.content_blocks_attributes
    const currentBlockReactId = currentBlock.react_id

    const currentBlockIndex = copiedOutlineContentBlocks.map((block) => block.react_id).indexOf(currentBlock.react_id)
    copiedOutlineContentBlocks.splice(currentBlockIndex + 1, 0, newBlock)

    copiedOutlineContentBlocks[currentBlockIndex] = {
      ...copiedOutlineContentBlocks[currentBlockIndex],
      ...currentBlock
    }

    this.props.updateSectionOutline({...this.props.outline, content_blocks_attributes: copiedOutlineContentBlocks}, {outline_id: this.props.outline.id})
  }

  render() {
    const playbook = this.props.playbook
    const section = this.state.section
    console.log('section', section)
    return [
      <CallNavigation key="callNavigation" sections={playbook?.sections_attributes} url={this.url} />,
      <div className="app-wrapper" key='editSection'>
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
                section &&
                  <div className="section-wrapper">
                    <span>{section.title}</span>
                    {
                      section.content_blocks_attributes.map((block) =>
                        <EditContentBlock
                          key={block.react_id}
                          value={block.text}
                          addBlock={this.addBlockHandler}
                          updateParentContentBlock={this.updateContentBlock}
                          block={block}
                          updatedObject={this.state.updatedElement}
                          parent='master'
                        />
                      )
                    }
                    <button className="secondary" onClick={this.addOutlineHandler}>Add Outline</button>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    ];
  }
};

function mapStateToProps(state, ownProps) {
  if (state.playbooks.length < 1) {
    return {
      playbook: state.playbook
    }
  }
  const playbookId = ownProps.match.params.playbook_id
  const sectionId = ownProps.match.params.id
  const playbook = state.playbooks.find((playbook) => playbook.id === playbookId)
  const section = playbook.sections_attributes.find((section) => section.id === sectionId)
  return {
    playbook: playbook,
    section: section,
    contentTypes: state.contentTypes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPlaybook, fetchContentTypes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSection);

