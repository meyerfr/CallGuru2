import React, { Component } from 'react'

import { uuid, setCaretToEnd } from './helperFunctions'
import { Link } from 'react-router-dom'

import CustomDraftJSEditor from './customDraftJSEditor'

class EditContentBlock2 extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectMenuIsOpen: false,
      inlineToolbarIsOpen: false,
      previousKey: '',
      block: props.block,
      updatedElement: null,
      thisElRefs: []
    }
  }

  componentDidMount(){
    if (this.props.block.content_blocks_attributes) {
      const arrLength = this.props.block.content_blocks_attributes.length
      let thisElRefs

      thisElRefs = {
        myRef: this.props.myRef.childrenRef[i],
        childrenRef: this.props
      }

      this.setState({
      })

      this.setState({
        elRefs: Array(arrLength).fill().map((_, i) => elRefs[i] || React.createRef())
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.updatedElement !== prevProps.updatedElement) {
      const arrLength = section.content_blocks_attributes.length
      const elRefs = this.state.elRefs

      let ref;
      let childrenRef = []

      section.content_blocks_attributes.forEach((block, index) => {
        if (block.content_blocks_attributes.length > 0) {
          childrenRef.puh(React.createRef())
        }
        ref = {
          myRef: React.createRef(),
          childrenRef: block.content_blocks_attributes
        }
        elRefs.push(ref)
      })

      this.setState({
        updatedElement: this.props.updatedElement,
        elRefs: Array(arrLength).fill().map((_, i) => elRefs[i] || React.createRef())
      })
    }
    // if (prevState.updatedElement !== this.state.updatedElement) {
    //   this.props.updateParentContentBlock(this.state.block, this.state.updatedElement)
    // }
  }


  addBlock = (currentBlock, updatedElement, ref) => {
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

    const elRefs = this.state.elRefs
    elRefs.push(React.createRef())
    this.setState({
      ...this.state,
      elRefs: elRefs,
      block: {
        ...this.state.block,
        content_blocks_attributes: updatedBlockBlocks
      },
      updatedElement: {
        elementId: this.state.block.react_id
      }
    }, () => {
      elRefs[elRefs.length - 1].current.focus()
    })
  }

  deleteBlock = (currentBlock, updatedObject, index) => {
    const blocks = this.state.block.content_blocks_attributes
    // const previousBlock = currentBlock.ref.parentElement.previousElementSibling;
    const updatedBlocks = blocks.filter((block) => block.react_id !== currentBlock.react_id)
    const elRefs = this.state.elRefs
    if (updatedBlocks.length > 0) {
      elRefs.splice(index, 1)
      this.setState({
        block: {
          ...this.state.block,
          content_blocks_attributes: updatedBlocks
        },
        elRefs: elRefs,
        updatedElement: {
          elementId: this.state.block.react_id
        }
      }, () => {
        if (index > 0) {
          elRefs[index - 1].current.focus()
        } else{
          this.props.prevRef(this.props.index)
        }
      })
    }
  }


  prevBlock = (element) => {

  }

  nextBlock = (element) => {

  }

  render(){
    const {selectMenuIsOpen, inlineToolbarIsOpen, block} = this.state

    switch(block.content_type.group){
      case 'select':
      case 'multiselect':
      case 'input':
        return <CustomDraftJSEditor key={block.react_id} classNames={`${block.content_type.style} block-input`} block={block} updatedElement={this.state.updatedElement} myRef={this.props.myRef.ref} addBlock={this.props.addBlock} deleteBlock={this.props.deleteBlock} updatedElement={this.state.updatedElement} />
      case 'outline':
        return(
          <div className="blocks outline" key={block.react_id}>
            <CustomDraftJSEditor classNames={`${block.content_type.style} block-input`} block={block} updatedElement={this.state.updatedElement} myRef={this.props.myRef.ref} addBlock={this.props.addBlock} deleteBlock={this.props.deleteBlock} updatedElement={this.state.updatedElement}/>
            {
              block.content_blocks_attributes.length > 0 &&
              block.content_blocks_attributes.map((block, i) => {
                return <EditContentBlock2
                  updatedObject={this.state.updatedElement}
                  key={block.react_id}
                  value={block.text}
                  block={block}
                  addBlock={this.addBlock}
                  deleteBlock={this.deleteBlock}
                  myRef={this.state.elRefs.childrenRef[i].ref}
                />
              })
            }
          </div>
        )
      default:
        return <CustomDraftJSEditor key={block.react_id} classNames={`${block.content_type.style} block-input`} block={block} updatedElement={this.state.updatedElement} myRef={this.props.myRef.ref} addBlock={this.props.addBlock} deleteBlock={this.props.deleteBlock} updatedElement={this.state.updatedElement}/>
    }
  }
}
export default EditContentBlock2
