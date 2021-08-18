import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPlaybook, createSection, updateSection, fetchContentTypes } from '../actions'
import { uuid } from '../helperFunctions'

import Sidebar2 from '../components/sidebar2'
import { EditPlaybookSidebarTop, EditPlaybookSidebarBottom } from '../components/sidebarHelpers'

import PageHeader from '../components/pageHeader'

import BlockContainer from '../blocks/blockContainer'

// import playbooks from '../db/playbooks'

class EditSection extends Component {
  constructor(props){
    super(props)
    this.myRef = React.createRef()
    this.state = {
      updatedElement: null,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playbook && prevProps.section.id !== this.props.section.id) {
      // this.setState({
      //   updatedElement: null
      // })
      this.updateSection()
    }
    if (!prevProps.playbook || prevProps.section.id !== this.props.section.id) {
      this.setSectionToState(this.props.section)
    }
  }

  updateSection = () => {
    const playbook = {
      sections_attributes: this.state.section
    }

    this.props.updateSection(this.state.section)
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


  updateContentBlocks = (section, callback) => {
    this.setState({
      ...this.state,
      section: section
    }, () => {
      if (callback) {
        typeof callback === 'function' ? callback() : null
      }
    })
  }

  addSection = () => {
    this.props.createSection(this.props.match.params.playbook_id).then((r) => this.props.history.push(`/playbooks/${playbook_id}/sections/${section.id}`))
  }

  render() {
    const playbook = this.props.playbook
    const sections = playbook?.sections_attributes
    const section = this.state.section
    // console.log('render editSection')

    if (sections) {
      return [
        <Sidebar2
          key="Sidebar"
          inCall={false}
          endCall={this.endCall}
          top={<EditPlaybookSidebarTop playbook_id={this.props.match.params.playbook_id} sections={sections} addSection={this.addSection} />}
          bottom={<EditPlaybookSidebarBottom save={() => console.log('save')} />}
          lightStyle={true}
        />,
        <div className="app-wrapper" key='editSection'>
          <PageHeader key="PageHeader" page={`Edit ${playbook?.name}`}>
            <div className="actions">
              <button className="secondary" onClick={this.updatePlaybook}>Save</button>
            </div>
          </PageHeader>
          <div className="page-content-wrapper row-2 a-fr">
            <div className="page-content-container">
              {
                section &&
                  <div className="blocks wrapper" style={{position: 'relative'}}>
                    <BlockContainer block={section} parent="section" section_id={section.id} updateParentBlock={this.updateContentBlocks} />
                  </div>
              }
            </div>
          </div>
        </div>
      ];
    }else{
      return(
        <div></div>
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
  return bindActionCreators({ fetchPlaybook, createSection, updateSection, fetchContentTypes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSection);
