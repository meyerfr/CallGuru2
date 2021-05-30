import React, { Component } from 'react'

import { uuid } from './helperFunctions'

import EditContentOption from './editContentOption'

class EditContentBlock extends Component{
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      selectMenuIsOpen: false,
      previousKey: '',
      block: props.block,
      updatedElement: null
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.updatedElement !== prevProps.updatedElement) {
      this.setState({
        updatedElement: this.props.updatedElement
      })
    }


    if (prevState.updatedElement !== this.state.updatedElement) {
      this.props.updateParentContentBlock(this.state.block, this.state.updatedElement)
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (nextState.block.text !== this.state.block.text){
      return true
    }
    if (this.state.updatedElement !== nextState.updatedElement) {
      return true
    }
    return false
  }


  onKeyDownHandler = (e) => {
    if (e.key === "/") {
      this.setState({ valueBackup: this.state.value });
    }
    if (e.key === "Enter" && !this.state.selectMenuIsOpen) {
      if (this.state.previousKey !== "Shift") {
        e.preventDefault();
        this.props.addBlock(this.state.block, this.state.updatedElement);
      }
    }
    if (e.key === "Backspace" && !this.state.block.text) {
      e.preventDefault();
    //  if (this.state.type === Types.PARAGRAPH) {
    //  delete Block
        this.props.deleteBlock(this.state.block, this.state.updatedElement);
     // } else{
     //   change Type to Paragraph
     //   this.setState({ type: Types.PARAGRAPH, value: '' })
     // }
    }
    // if (e.key === "ArrowUp") {
    //   if (this.state.previousKey === "Shift") {
    //     e.preventDefault();
    //     e.target.select()
    //   }else{
    //     e.preventDefault();
    //     this.props.prevElement({
    //       id: this.props.id,
    //       ref: this.myRef.current
    //     });
    //   }
    // }
    // if (e.key === "ArrowDown") {
    //   e.preventDefault();
    //   this.props.nextElement({
    //     id: this.props.id,
    //     ref: this.myRef.current
    //   });
    // }

  }

  updateParentContentBlock = (contentBlock, updatedObject={}) => {
    let copiedBlocks = this.state.block.content_blocks_attributes
    let blockReactId = contentBlock.react_id
    let toBeUpdatedIndex = copiedBlocks.findIndex((block) => block.react_id === blockReactId)

    copiedBlocks[toBeUpdatedIndex] = contentBlock

    this.setState({
      block: {
        ...this.state.block,
        content_blocks_attributes: copiedBlocks
      },
      updatedElement: {
        elementId: this.state.block.react_id,
        childElements: updatedObject
      }
    })
  }




  onNameUpdate = (e) => {
    let block = {
      ...this.state.block,
      text: e.target.value
    }

    this.setState({
      block: block,
      updatedElement: {
        elementId: block.react_id
      }
    })
  }

  addBlock = (currentBlock) => {
    console.log('props', this.props)
    const contentType = this.props.contentTypes.find((type) => type.group === 'text' && type.style === 'paragraph')
    const copiedBlock = this.state.block
    const copiedBlockBlocks = copiedBlock.content_blocks_attributes
    const currentBlockIndex = copiedBlockBlocks.map((block) => block.react_id).indexOf(currentBlock.react_id)
    const updatedBlockBlocks = copiedBlockBlocks.slice(0)

    const newBlock = {
      id: null,
      contentable_type: 'ContentBlock',
      contentable_id: this.props.block.id,
      content_type_id: contentType.id,
      text: '',
      order_no: null,
      content_blocks_attributes: [],
      _destroy: '1',
      react_id: uuid(),
      content_type: contentType
    }

    updatedBlockBlocks.splice(currentBlockIndex + 1, 0, newBlock)

    updatedBlockBlocks[currentBlockIndex] = {
      ...updatedBlockBlocks[currentBlockIndex],
      ...currentBlock
    }

    this.setState({
      ...this.state,
      block: {
        ...this.state.block,
        content_blocks_attributes: updatedBlockBlocks
      },
      updatedElement: {
        elementId: this.state.block.react_id
      }
    })
  }

  deleteBlock = (currentBlock, updatedObject) => {
    const blocks = this.state.block.content_blocks_attributes
    const updatedBlocks = blocks.filter((block) => block.react_id !== currentBlock.react_id)
    if (updatedBlocks.length > 0) {
      this.setState({
        block: {
          ...this.state.block,
          content_blocks_attributes: updatedBlocks
        },
        updatedElement: {
          elementId: this.state.block.react_id
        }
      })
    }
  }

  render(){
    const block = this.state.block
    console.log(block)
    return[
      <div key="contentBlock" style={{display: 'grid'}}>
        <span>{block.content_type.style}</span>
        {
          block.content_type.group !== 'list' ?
            <input ref={this.myRef} key="outlineTitle" onKeyDown={this.onKeyDownHandler} value={block.text} onChange={this.onNameUpdate} placeholder="contentBlock Text" />
          :
            <span>List</span>
        }
        {
          block.content_blocks_attributes && block.content_blocks_attributes.length > 0 &&
            block.content_blocks_attributes.map((block) =>
              <EditContentBlock
                key={block.react_id}
                value={block.text}
                block={block}
                updateParentContentBlock={this.updateParentContentBlock}
                updatedObject={this.state.updatedElement}
                parent='content_block'
                addBlock={this.addBlock}
                deleteBlock={this.deleteBlock}
                contentTypes={this.props.contentTypes}
              />
            )
        }
      </div>
    ]
  }
}

export default EditContentBlock;
