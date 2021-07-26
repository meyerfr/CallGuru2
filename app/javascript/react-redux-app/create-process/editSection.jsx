import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

import { fetchPlaybook, updatePlaybook, fetchContentTypes } from '../actions'
import { uuid } from './helperFunctions'

import Sidebar2 from '../components/sidebar2'
import { EditPlaybookSidebarTop, EditPlaybookSidebarBottom } from '../components/sidebarHelpers'

import PageHeader from '../components/pageHeader'
import PlaybookCard from '../components/playbookCard'
import EditOutlineItem from './editOutlineItem'
import EditContentBlock from './editContentBlock'
import EditContentBlock2 from './editContentBlock2'
import ContentBlockContainer from './contentBlockContainer'

// import playbooks from '../db/playbooks'

class EditSection extends Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef()
    this.state = {
      updatedElement: null,
      toolbar: {
        left: 0,
        top: 0
      },
      elRefs: []
    }
  }

  componentDidMount() {
    if (!this.props.playbook) {
      this.props.fetchContentTypes()
      this.props.fetchPlaybook(this.props.match.params.playbook_id)
      // .then((r) => this.setSectionToState(r.payload))
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   debugger
  //   return true
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playbook && prevProps.section.id !== this.props.section.id && this.state.updatedElement !== null) {
      this.setState({
        updatedElement: null
      })
      this.updatePlaybook()
    }
    if (!prevProps.playbook || prevProps.section.id !== this.props.section.id) {
      this.setSectionToState(this.props.section)
    }
  }



  updatePlaybook = () => {
    const playbook = {
      sections_attributes: this.state.section
    }

    this.props.updatePlaybook(this.props.match.params.playbook_id, playbook)
  }

  shouldComponentUpdate(nextProps, nextState){

    return true
  }

  setSectionToState = (section) => {
    const arrLength = section.content_blocks_attributes.length
    let elRefs = []

    let ref;
    let childrenRef = []

    section.content_blocks_attributes.forEach((block, index) => {
      childrenRef = []
      if (block.content_blocks_attributes.length > 0) {
        childrenRef.push(React.createRef())
      }
      ref = {
        myRef: React.createRef(),
        childrenRef: childrenRef
      }
      elRefs.push(ref)
    })
    this.setState({
      section: section,
      elRefs: elRefs
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

  addBlock = (currentBlock, updatedObject, callback) => {
    const outlineContentType = this.props.contentTypes.find((type) => type.group === 'outline' && type.style === 'outline')
    const paragraphContentType = this.props.contentTypes.find((type) => type.group === 'text' && type.style === 'paragraph')
    const copiedSection = this.state.section
    const copiedSectionBlocks = copiedSection.content_blocks_attributes
    const currentBlockIndex = copiedSectionBlocks.map((block) => block.react_id).indexOf(currentBlock.react_id)
    const updatedSectionBlocks = copiedSectionBlocks.slice(0)

    const newBlock = {
      id: null,
      contentable_type: 'Section',
      contentable_id: this.state.section.id,
      content_type_id: outlineContentType.id,
      text: '',
      order_no: null,
      content_blocks_attributes: [{
        id: null,
        contentable_type: 'ContentBlock',
        contentable_id: null,
        content_type_id: paragraphContentType.id,
        text: '',
        order_no: null,
        content_blocks_attributes: [],
        _destroy: '1',
        react_id: uuid(),
        content_type: paragraphContentType
      }],
      _destroy: '1',
      react_id: uuid(),
      content_type: outlineContentType
    }

    updatedSectionBlocks.splice(currentBlockIndex + 1, 0, newBlock)

    updatedSectionBlocks[currentBlockIndex] = {
      ...updatedSectionBlocks[currentBlockIndex],
      ...currentBlock
    }

    const elRefs = this.state.elRefs
    elRefs.push(React.createRef())
    this.setState({
      ...this.state,
      section: {
        ...this.state.section,
        content_blocks_attributes: updatedSectionBlocks
      },
      elRefs: elRefs,
      updatedElement: updatedObject
    }, () => {
      elRefs[elRefs.length - 1].current.focus()
    })
  }

  deleteBlock = (currentBlock, updatedObject, callback) => {
    const blocks = this.state.section.content_blocks_attributes
    const updatedBlocks = blocks.filter((block) => block.react_id !== currentBlock.react_id)
    if (updatedBlocks.length > 0) {
      this.setState({
        section: {
          ...this.state.section,
          content_blocks_attributes: updatedBlocks
        },
        updatedElement: updatedObject
      }, callback())
    }
  }

  url = section_id => {
    return `/playbooks/${this.props.match.params.playbook_id}/sections/${section_id}`
  }

  updateContentBlock = (contentBlock, updatedObject) => {
    let copiedOutlineContentBlocks = this.state.section.content_blocks_attributes
    let contentBlockReactId = contentBlock.react_id
    let toBeUpdatedContentBlockIndex = copiedOutlineContentBlocks.findIndex((block) => block.react_id === contentBlockReactId)
    const newContentBlock = contentBlock
    delete newContentBlock.ref
    copiedOutlineContentBlocks[toBeUpdatedContentBlockIndex] = newContentBlock


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
    this.setState({
      ...this.state,
      section: {
        ...this.state.section,
        title: e.target.value
      }
    })
    // this.props.updateSectionOutline({...this.props.outline, title: e.target.value}, {outline_id: this.props.outline.id})
  }

  changeToolbarPosition = (e) => {
    const myElement = e.target
    this.setState({
      ...this.state,
      toolbar: {
        ...this.state.toolbar,
        top: myElement.offsetTop - myElement.offsetHeight
      }
    })
  }

  lastRef = (index) => {

  }

  render() {
    const playbook = this.props.playbook
    const sections = playbook?.sections_attributes
    const section = this.state.section

    if (sections) {
      return [
        <Sidebar2
          key="Sidebar"
          inCall={false}
          endCall={this.endCall}
          top={<EditPlaybookSidebarTop playbook_id={this.props.match.params.playbook_id} sections={sections} addSection={() => console.log('addSection')} />}
          bottom={<EditPlaybookSidebarBottom save={() => console.log('save')} />}
          lightStyle={true}
        />,
        <div className="app-wrapper" key='editSection'>
          <PageHeader key="PageHeader" page={`Edit ${playbook?.name}`}>
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
              {
                section &&
                  <div className="blocks wrapper" style={{position: 'relative'}}>
                    <ContentBlockContainer blocks={section.content_blocks_attributes} parent={section} />
                    {/*  section.content_blocks_attributes.map((block, i) =>
                        <EditContentBlock2
                          updatedObject={this.state.updatedElement}
                          addBlock={this.addBlock}
                          deleteBlock={this.deleteBlock}
                          key={block.react_id}
                          value={block.text}
                          block={block}
                          index={i}
                          prevRef={this.lastRef}
                          contentTypes={this.props.contentTypes}
                          myRef={this.state.elRefs[i]}
                        />
                      <EditContentBlock
                        key={block.react_id}
                        editable={true}
                        value={block.text}
                        // addBlock={this.addBlockHandler}
                        updateParentContentBlock={this.updateContentBlock}
                        block={block}
                        updatedObject={this.state.updatedElement}
                        parent='master'
                        addBlock={this.addBlock}
                        deleteBlock={this.deleteBlock}
                        contentTypes={this.props.contentTypes}
                        changeToolbarPosition={this.changeToolbarPosition}
                      />*/}
                  </div>
              }
            </div>
          </div>
        </div>
      ];
    }else{
      return(
        "loading"
      )
    }
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
  return bindActionCreators({ fetchPlaybook, updatePlaybook, fetchContentTypes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSection);

