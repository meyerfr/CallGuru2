import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uuid } from '../helperFunctions'

import {EditorState} from 'draft-js';
import Block from './block'

class BlockContainer extends Component {
  constructor(props){
    super(props)
    let myRefs = []
    props.block.content_blocks_attributes.forEach((block, index) => {
      myRefs.push({
        thisRef: ["bullet", "numbered"].includes(block.content_type.style) ? undefined : React.createRef(),
        blockContainerRef: React.createRef()
      })
    })
    this.state = {
      blocks: props.block.content_blocks_attributes,
      myRefs: myRefs
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.block?.id !== this.props.block?.id) {
      let myRefs = []
      this.props.block.content_blocks_attributes.forEach((block, index) => {
        myRefs.push({
          thisRef: ["bullet", "numbered"].includes(block.content_type.style) ? undefined : React.createRef(),
          blockContainerRef: React.createRef()
        })
      })
      this.setState({
        blocks: this.props.block.content_blocks_attributes,
        myRefs: myRefs
      })
    }
  }

  updateParentBlock = (block, callback = () => {}) => {
    const copyBlocks = this.state.blocks.slice()
    const blockReactId = block.react_id
    const blockIndex = copyBlocks.findIndex((block) => block.react_id === blockReactId)
    copyBlocks[blockIndex] = block
    this.setState({
      ...this.state,
      blocks: copyBlocks
    }, () => {
      !this.props.readOnly && this.props.updateParentBlock({...this.props.block, content_blocks_attributes: this.state.blocks}, callback())
    })
  }

  addBlock = (currentBlock, style = 'paragraph', callback = () => {}) => {
    if (this.props.parentBlock === 'block' && ['numbered', 'bullet'].includes(this.props.block.content_type.style) && style !== 'paragraph') {
      this.props.addBlock(this.props.block, style, callback)
      return
    }
    let newBlocks = this.state.blocks.slice()
    let newMyRefs = this.state.myRefs.slice()
    let currentBlocksIndex = newBlocks.findIndex((block) => block.react_id === currentBlock.react_id)

    const contentType = this.props.contentTypes.find((type) => type.style === style)
    const defaultContentType = this.props.contentTypes.find((type) => type.style === 'paragraph')

    let newBlock = {
      id: null,
      contentable_type: 'ContentBlock',
      contentable_id: this.props.block.id,
      content_type_id: contentType.id,
      content_type: contentType,
      text: null,
      order_no: null,
      content_blocks_attributes: [],
      _destroy: '0',
      react_id: uuid()
    }
    switch(contentType.style){
      case 'bullet':
      case 'numbered':
      case 'toggle':
      case 'multiselect':
      case 'select':
        newBlock = {
          ...newBlock,
          content_blocks_attributes: [
            {
              ...newBlock,
              content_type: defaultContentType,
              content_type_id: defaultContentType.id,
            }
          ]
        }
    }


    newBlocks.splice(currentBlocksIndex + 1, 0, newBlock)
    newMyRefs.splice(currentBlocksIndex + 1, 0, {thisRef: ["bullet", "numbered"].includes(contentType.style) ? undefined : React.createRef(), blockContainerRef: React.createRef()})
    this.setState({
      blocks: newBlocks,
      myRefs: newMyRefs
    }, () => {
      this.props.updateParentBlock({...this.props.block, content_blocks_attributes: this.state.blocks}, () => {
        callback()
        this.focusNextBlock(currentBlocksIndex)
      })
    })
  }

  deleteBlock = (currentBlock) => {
    let newBlocks = this.state.blocks.slice()
    let newMyRefs = this.state.myRefs.slice()
    let newState = {}

    if (newBlocks.filter(block => block._destroy === '0').length - 1 <= 0) { // last Element of branch
      if (currentBlock.content_type.style !== 'paragraph') {
        let currentBlocksIndex = newBlocks.findIndex((block) => block.react_id === currentBlock.react_id)
        let newContentType = this.props.contentTypes.find((type) => type.style === 'paragraph')
        newBlocks[currentBlocksIndex] = {...currentBlock, content_type_id: newContentType.id, content_type: newContentType}

        this.setState({
          blocks: newBlocks
        })
        // newBlocks[currentBlocksIndex] = {...currentBlock, content_type}
        return
      }
      // if (this.props.deleteBlock) {
      this.props.deleteBlock && this.props.deleteBlock(this.props.block)
      return
      // }else{
      // }
    }

    // mark Block for delete and remove to end of list
    let currentBlocksIndex = newBlocks.findIndex((block) => block.react_id === currentBlock.react_id)
    newBlocks.splice(currentBlocksIndex, 1)
    newMyRefs.splice(currentBlocksIndex, 1)
    newBlocks.splice(newBlocks.length, 0, {...currentBlock, _destroy: '1'})
    if (this.props.parentBlock === 'block' && ['numbered', 'bullet'].includes(this.props.block.content_type.style)) {
      // if item is inside list, remove item from list and add to parentContainer at this.props.index + 1,
            // add another list to parentContainer at this.props.index + 2 with all following list items
              // focus this element
    } else{
    }

    this.setState({
      blocks: newBlocks,
      myRefs: newMyRefs
    }, () => {
      if (currentBlocksIndex === 0) {
        this.props.updateParentBlock({...this.props.block, content_blocks_attributes: this.state.blocks}, this.focusNextBlock(currentBlocksIndex - 1))
      } else{
        this.focusPrevBlock(currentBlocksIndex)
        this.props.updateParentBlock({...this.props.block, content_blocks_attributes: this.state.blocks})
      }
    })
  }

  focusNextBlock = (currentFocusedIndex) => {
    const myRefs = this.state.myRefs.slice()
    if (myRefs.length - 1 !== currentFocusedIndex) { // not last Element of this branch
      if (myRefs[currentFocusedIndex + 1].thisRef) {
        myRefs[currentFocusedIndex + 1].thisRef.current.focus()
      }else{
        myRefs[currentFocusedIndex + 1].blockContainerRef.current?.classList.remove('last')
        myRefs[currentFocusedIndex + 1].blockContainerRef.current?.classList.add('first')
        myRefs[currentFocusedIndex + 1].blockContainerRef.current?.click()
      }
    } else{ // last Element of this branch
      this.props.focusNextBlock && this.props.focusNextBlock()
    }



    // const myRefs = this.state.myRefs.slice()
    // if (myRefs.length - 1 !== currentFocusedIndex) {
    //   myRefs[currentFocusedIndex + 1].thisRef.current?.focus()
    // }
  }

  focusPrevBlock = (currentFocusedIndex) => {
    const myRefs = this.state.myRefs.slice()
    if (currentFocusedIndex !== 0) { // not first Element of branch
      if (myRefs[currentFocusedIndex - 1].thisRef) {
        myRefs[currentFocusedIndex - 1].thisRef.current.focus()
      }else{
        myRefs[currentFocusedIndex - 1].blockContainerRef.current.classList.remove('first')
        myRefs[currentFocusedIndex - 1].blockContainerRef.current.classList.add('last')
        myRefs[currentFocusedIndex - 1].blockContainerRef.current.click()
      }

    } else{
      this.props.focusPrevBlock && this.props.focusPrevBlock()
    }
  }

  createNewBlockRegardingContentType = (style) => {
    const newContentType = this.props.contentTypes.find((contentType) => contentType.name === style)
    let block = {
      ...this.props.block,
      text: convertToRaw(this.state.editorBackup ? this.state.editorBackup.getCurrentContent() : this.state.editorState.getCurrentContent()),
      content_type_id: newContentType.id,
      content_type: newContentType
    }

    switch(style) {
      case 'paragraph':

    }
  }

  changeContentType = (style, block) => {
    const copyBlocks = this.state.blocks.slice()
    let newMyRefs = this.state.myRefs.slice()
    const blockReactId = block.react_id
    const blockIndex = copyBlocks.findIndex((block) => block.react_id === blockReactId)

    const newContentType = this.props.contentTypes.find((contentType) => contentType.style === style)
    const defaultContentType = this.props.contentTypes.find((contentType) => contentType.style === 'paragraph')

    let toBoFocusedRef = newMyRefs[blockIndex].thisRef

    switch(style){
      case 'numbered':
      case 'bullet':
        let prevBlock = copyBlocks[blockIndex - 1]
        if (copyBlocks[blockIndex - 1]?.content_type.style === style) {
          const insertBlock = {...block, content_type: defaultContentType, content_type_id: defaultContentType.id}
          prevBlock.content_blocks_attributes.push(insertBlock)
          copyBlocks[blockIndex - 1] = prevBlock
          // mark Block for delete and remove to end of list
          copyBlocks.splice(blockIndex, 1)
          newMyRefs.splice(blockIndex, 1)
          copyBlocks.splice(copyBlocks.length, 0, {...block, _destroy: '1'})
        }else{
          // remove Text from This block and add
          copyBlocks[blockIndex] = {
            ...block,
            text: "",
            content_type: newContentType,
            content_type_id: newContentType.id,
            content_blocks_attributes: [{
              id: null,
              contentable_type: 'ContentBlock',
              contentable_id: this.props.block.id,
              content_type_id: defaultContentType.id,
              content_type: defaultContentType,
              text: block.text,
              order_no: null,
              content_blocks_attributes: [],
              _destroy: '0',
              react_id: uuid()
            }]
          }

          newMyRefs[blockIndex].thisRef = undefined
          toBoFocusedRef = newMyRefs[blockIndex].blockContainerRef
        }
        break;
        // if pref Block also this style
        //    insert into prev List
        // else
        //    remove text from this block, create new List inside with thisBlocks text as first Elements Text
      case 'toggle':
      default:
        copyBlocks[blockIndex] = {...block, content_type_id: newContentType.id, content_type: newContentType}
    }

    const newCallback = () => {
      toBoFocusedRef.current.classList?.contains('d-none') ?
        toBoFocusedRef.current.click()
      :
        toBoFocusedRef.current.focus()
      // callback(copyBlocks[blockIndex].text)
    }
    // copyBlocks[blockIndex] = this.getNewContentBlockAccordingToType(newContentType, block)
    this.setState({
      ...this.state,
      blocks: copyBlocks,
      myRefs: newMyRefs
    }, () => {
      this.props.updateParentBlock({...this.props.block, content_blocks_attributes: this.state.blocks}, newCallback)
    })
  }

  handleWrapperFocus = () => {
    const wrapper = document.getElementById(`${this.props.block.react_id}-wrapper`)
    let index = 0
    if (wrapper?.classList.contains('last')) {
      index = this.state.myRefs.length - 1
    }

    this.state.myRefs[index].thisRef ?
      this.state.myRefs[index].thisRef.current?.focus()
    :
      this.state.myRefs[index].blockContainerRef.current.click()

  }

  render() {
    const {blocks, myRefs} = this.state
    return(
      <div className={`blocks${this.props.block.content_type ? ` ${this.props.block.content_type.style}` : ''}`}>
        <div className="d-none" id={`${this.props.block.react_id}-wrapper`} ref={this.props.myRef} onClick={this.handleWrapperFocus} onFocus={this.handleWrapperFocus}></div>
        {
          blocks.map((block, index) => {
            if (block._destroy !== '1') {
              return [
                !['bullet', 'numbered'].includes(block.content_type.style) &&
                <Block
                  readOnly={this.props.readOnly || false}
                  block={block}
                  key={block.react_id}
                  myRef={myRefs[index]?.thisRef}
                  updateParentBlock={this.updateParentBlock}
                  addBlock={this.addBlock}
                  deleteBlock={this.deleteBlock}
                  focusNextBlock={() => this.focusNextBlock(index)}
                  focusPrevBlock={() => this.focusPrevBlock(index)}
                  changeContentType={this.changeContentType}
                />,
                block.content_blocks_attributes.length > 0 &&
                <BlockContainer
                  key={`blockContainer${block.react_id}`}
                  readOnly={this.props.readOnly || false}
                  block={block}
                  myRef={myRefs[index]?.blockContainerRef}
                  deleteBlock={this.deleteBlock}
                  parentBlock="block"
                  contentTypes={this.props.contentTypes}
                  addBlock={this.addBlock}
                  focusNextBlock={() => this.focusNextBlock(index)}
                  focusPrevBlock={() => this.focusPrevBlock(index)}
                  updateParentBlock={this.updateParentBlock}
                />
              ]
            }
          })
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    contentTypes: state.contentTypes
  }
}


export default connect(mapStateToProps, null)(BlockContainer);
