import React, { Component } from 'react'

import { uuid, setCaretToEnd } from './helperFunctions'
import { Link } from 'react-router-dom'

import EditContentOption from './editContentOption'

import List from './content-types-components/list'
import Select from './content-types-components/select'
import Input from './content-types-components/input'
import Paragraph from './content-types-components/paragraph'

class EditContentBlock extends Component{
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      selectMenuIsOpen: false,
      previousKey: '',
      block: props.block,
      updatedElement: null,
      editable: props.editable ? props.editable : false
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
    if (this.props.selected !== nextProps.selected) {
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
    if (e.key === "Backspace" && this.state.block.text === '') {
      e.preventDefault();
    //  if (this.state.type === Types.PARAGRAPH) {
    //  delete Block
        this.props.deleteBlock(this.state.block, this.state.updatedElement);
     // } else{
     //   change Type to Paragraph
     //   this.setState({ type: Types.PARAGRAPH, value: '' })
     // }
    }
    if (e.key === "ArrowUp") {
      if (this.state.previousKey === "Shift") {
        e.preventDefault();
        e.target.select()
      }else{
        e.preventDefault();
        this.prevElement(this.myRef.current);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.nextElement(this.myRef.current);
    }

    this.setState({ previousKey: e.key });
  }

  placeCaretAtEnd = (el) => {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
  }

  nextElement = (element) => {
    const ref = element
    let nextElement = ref.nextElementSibling
    if (nextElement) {
      if (nextElement.firstElementChild) {
        do {
          nextElement = nextElement.firstElementChild
        }
        while(nextElement.firstElementChild);
      }
      this.placeCaretAtEnd(nextElement)
    } else if(ref.parentElement){
      this.nextElement(ref.parentElement)
    }
    // } else if(ref.parentElement.parentElement.nextElementSibling){
    //   ref.parentElement.parentElement.nextElementSibling.firstElementChild.focus()
    // }
  }

  prevElement = (element) => {
    const ref = element
    let prevElement = element.previousElementSibling
    if (prevElement) {
      if (prevElement.lastElementChild) {
        do{
          prevElement = prevElement.lastElementChild
        }
        while(prevElement.lastElementChild)
      }
      this.placeCaretAtEnd(prevElement)
    } else if(element.parentElement && !element.parentElement.classList.contains('wrapper')){
      this.prevElement(element.parentElement)
    }
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

  onClick = (clicked_content_block, updatedObject={}) => {
    let copiedContentBlock = this.state.block
    if (this.state.block.content_type.style === 'multiselect') {
      let presentContentOption = copiedContentBlock.summary_item.content_options_summary_items_attributes.find((item) => item.content_block_id === clicked_content_block.id)
      if (presentContentOption) {
        const newContentOptions = copiedContentBlock.summary_item.content_options_summary_items_attributes.map((item) => {
          if (item.content_block_id === presentContentOption.content_block_id) {
            return {
              ...item,
              _destroy: item._destroy === '1' ? '0' : '1'
            }
          } else{
            return item
          }
        })
        copiedContentBlock.summary_item.content_options_summary_items_attributes = newContentOptions
      } else{
        copiedContentBlock.summary_item.content_options_summary_items_attributes.push({id: null, summary_item_id: copiedContentBlock.summary_item.id, content_block_id: clicked_content_block.id, _destroy: '0'})
      }
      if (this.state.block.summary_item.content_options_summary_items_attributes.every((element) => element._destroy === '1')) {
        copiedContentBlock.summary_item._destroy = '1'
      } else{
        copiedContentBlock.summary_item._destroy = '0'
      }
    } else{
      copiedContentBlock.summary_item.content_options_summary_items_attributes.content_block_id = clicked_content_block.id
      copiedContentBlock.summary_item._destroy = '0'
    }

    this.setState({
      block: copiedContentBlock,
      updatedElement: {
        elementId: this.state.block.react_id,
        childElements: updatedObject
      }
    })
  }

  onInputChange = (block, event) => {
    if (event.target) {event.preventDefault()}
    const newValue = event.target ? event.target.value : event
    let copiedContentBlock = this.state.block
    copiedContentBlock.summary_item.simple_answer_attributes.content = newValue
    if (copiedContentBlock.summary_item.simple_answer_attributes.content === '') {
      copiedContentBlock.summary_item._destroy = '1'
    }else{
      copiedContentBlock.summary_item._destroy = '0'
    }
    this.setState({
      block: copiedContentBlock,
      updatedElement: {
        elementId: this.state.block.react_id
      }
    })
  }

  onBlockChange = (block, event) => {
    console.log(this.state.block)
    if (event.target) {event.preventDefault()}
    const newValue = event.target ? event.target.value : event
    let copiedContentBlock = this.state.block
    copiedContentBlock.text = newValue
    if (copiedContentBlock.text === '') {
      copiedContentBlock._destroy = '1'
    }else{
      copiedContentBlock._destroy = '0'
    }
    this.setState({
      block: copiedContentBlock,
      updatedElement: {
        elementId: this.state.block.react_id
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
    }, () => {
      currentBlock.ref.parentElement.nextElementSibling.firstElementChild.focus()
    })
  }

  deleteBlock = (currentBlock, updatedObject) => {
    const blocks = this.state.block.content_blocks_attributes
    const previousBlock = currentBlock.ref.parentElement.previousElementSibling;
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
      }, () => {
        if (previousBlock) {
          setCaretToEnd(previousBlock);
          previousBlock.firstElementChild.focus();
        }
      })
    }
  }

  render(){
    const block = this.state.block
    const editable = this.state.editable
    console.log(this.props)
    if (editable) {
      // switch(block.content_type.group){
      //   case 'list':
      //     return(
      //       <div key="contentBlock" className={`block-wrapper ${block.content_type.style}`}>
      //         {
      //           block.content_blocks_attributes.map((block) =>
      //             <EditContentBlock
      //               updatedObject={this.state.updatedElement}
      //               editable={this.state.editable}
      //               key={block.id}
      //               value={block.text}
      //               block={block}
      //               updateParentContentBlock={this.updateParentContentBlock}
      //               updatedObject={this.state.updatedElement}
      //               parent='content_block'
      //               addBlock={this.addBlock}
      //               deleteBlock={this.deleteBlock}
      //               contentTypes={this.props.contentTypes}
      //             />
      //           )
      //         }
      //       </div>
      //     )
      //   default:
      //     return(
      //       <div key="contentBlock" className={`block-wrapper ${block.content_type.style}`}>
      //         <input ref={this.myRef} className={`block-input ${block.content_type.style}`} key="outlineTitle" onKeyDown={this.onKeyDownHandler} onChange={this.onNameUpdate} value={block.text} placeholder={block.content_type.style} />
      //         {
      //           block.content_blocks_attributes &&
      //           block.content_blocks_attributes.map((block) =>
      //             <EditContentBlock
      //               updatedObject={this.state.updatedElement}
      //               editable={this.state.editable}
      //               key={block.id}
      //               value={block.text}
      //               block={block}
      //               updateParentContentBlock={this.updateParentContentBlock}
      //               updatedObject={this.state.updatedElement}
      //               parent='content_block'
      //               addBlock={this.addBlock}
      //               deleteBlock={this.deleteBlock}
      //               contentTypes={this.props.contentTypes}
      //             />
      //           )
      //         }
      //       </div>
      //     )
      // }
      switch(block.content_type.group){
        case 'select':
        case 'multiselect':
        case 'input':
          return <Input
            block={block}
            editable={this.state.editable}
            onChange={this.onBlockChange}
            myRef={this.myRef}
            onKeyDown={this.onKeyDownHandler}
            changeToolbarPosition={this.props.changeToolbarPosition}
          />
          break;
        case 'outline':
          return(
            <div className="blocks outline" key={block.id}>
              <Input
                block={block}
                editable={this.state.editable}
                onChange={this.onBlockChange}
                myRef={this.myRef}
                onKeyDown={this.onKeyDownHandler}
                changeToolbarPosition={this.props.changeToolbarPosition}
              />
              {
                block.content_blocks_attributes.length > 0 &&
                block.content_blocks_attributes.map((block) => {
                  return <EditContentBlock
                    updatedObject={this.state.updatedElement}
                    editable={editable}
                    key={block.id}
                    value={block.text}
                    block={block}
                    updateParentContentBlock={this.updateParentContentBlock}
                    changeToolbarPosition={this.props.changeToolbarPosition}
                  />
                }
                )
              }
            </div>
          )
        case 'list':
          return(
            <div className={`blocks list ${block.content_type.style}`} key={block.id}>
              {
                block.content_blocks_attributes.length > 0 &&
                block.content_blocks_attributes.map((block) => {
                  return <EditContentBlock
                    updatedObject={this.state.updatedElement}
                    editable={editable}
                    key={block.id}
                    value={block.text}
                    block={block}
                    updateParentContentBlock={this.updateParentContentBlock}
                    changeToolbarPosition={this.props.changeToolbarPosition}
                  />
                }
                )
              }
            </div>
          )
        case 'link':
          const linkText = block.content_blocks_attributes.length > 0 ? block.content_blocks_attributes[0].text : block.text
          const website_url = block.text.includes('http') ? block.text : `//${block.text}`
          return(
            <a href={website_url} target="_blank" className="block link">{linkText}</a>
          )
        case 'img':
          return(
            <img className="block img" src={block.text} alt="img" />
          )
        default:
          return <Input
            block={block}
            editable={this.state.editable}
            onChange={this.onBlockChange}
            myRef={this.myRef}
            onKeyDown={this.onKeyDownHandler}
            changeToolbarPosition={this.props.changeToolbarPosition}
          />
      }
    }else{
      switch(block.content_type.group){
        case 'input':
          return <Input block={block} editable={this.state.editable} onChange={this.onInputChange} />
          break;
        case 'select':
        case 'multiselect':
          return <Select
            block={block}
            editable={this.state.editable}
            updatedElement={this.state.updatedElement}
            updateParentContentBlock={this.updateParentContentBlock}
            onClick={this.onClick}
          />
        case 'outline':
          return(
            <div className="blocks outline" key={block.id}>
              <p className="large bold">{block.text}</p>
              {
                block.content_blocks_attributes.length > 0 &&
                <div className="blocks">
                  {
                    block.content_blocks_attributes.map((block) => {
                      return <EditContentBlock
                        updatedObject={this.state.updatedElement}
                        editable={editable}
                        key={block.id}
                        value={block.text}
                        block={block}
                        updateParentContentBlock={this.updateParentContentBlock}
                      />
                    }
                    )
                  }
                </div>
              }
            </div>
          )
        case 'list':
          return <List block={block} editable={this.props.editable} updatedElement={this.state.updatedElement} updateParentContentBlock={this.updateContentBlock} />
        case 'link':
          const linkText = block.content_blocks_attributes.length > 0 ? block.content_blocks_attributes[0].text : block.text
          const website_url = block.text.includes('http') ? block.text : `//${block.text}`
          return(
            <a href={website_url} target="_blank" className="block link">{linkText}</a>
          )
        case 'img':
          return(
            <img className="block img" src={block.text} alt="img" />
          )
        default:
          return <Paragraph classPrefix={this.props.classPrefix} block={block} editable={this.props.editable} updatedElement={this.state.updatedElement} onClick={this.props.onClick} selected={this.props.selected} myRef={this.myRef.current} />
      }
    }
  }
}

export default EditContentBlock;
