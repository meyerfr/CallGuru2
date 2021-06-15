import React, { Component } from 'react'
import { connect } from 'react-redux';

import EditContentBlock from './editContentBlock'

import { uuid } from './helperFunctions'

class EditOutlineItem extends Component{

  shouldComponentUpdate(nextProps){
    if (nextProps.updated.outline_id === this.props.outline.id) {
      return true
    }
    return false
    // if (nextProps.value === this.props.value) {
    //   return false
    // }
    // return true

    // outline.content_blocks.forEach((block) => {
    //   block
    // })
    // let rerender = false
    // return nextProps.value !== this.props.value
    // return false
  }

  updateContentBlock = (contentBlock, updatedObject={}) => {
    console.log(this.props)
    let copiedOutlineContentBlocks = this.props.outline.content_blocks_attributes
    let contentBlockReactId = contentBlock.react_id
    let toBeUpdatedContentBlockIndex = copiedOutlineContentBlocks.findIndex((block) => block.react_id === contentBlockReactId)
    copiedOutlineContentBlocks[toBeUpdatedContentBlockIndex] = contentBlock
    this.props.updateSectionOutline({...this.props.outline, content_blocks_attributes: copiedOutlineContentBlocks}, {outline_id: this.props.outline.id, ...updatedObject})
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
      content_options_attributes: [],
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

  render(){
    console.log('render', this.props.outline)
    return[
      <input key="outlineTitle" value={this.props.value} onChange={this.onNameUpdate} placeholder="outline Title" />,
      this.props.outline.content_blocks_attributes.map((block) =>
        <EditContentBlock
          key={block.react_id}
          value={block.text}
          block={block}
          updateOutline={this.updateContentBlock}
          updated={this.props.updated}
          addBlockHandler={() => this.addBlockHandler(block)}
        />
      ),
    ]
  }
}


function mapStateToProps(state, ownProps) {
  return {
    contentTypes: state.contentTypes
  }
}

export default connect(mapStateToProps, null)(EditOutlineItem);

