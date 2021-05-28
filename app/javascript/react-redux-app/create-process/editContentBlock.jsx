import React, { Component } from 'react'

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

  // componentDidMount(){
  //   this.setState({
  //     block: this.props.block
  //   })
  // }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.block.text !== this.props.text) {
    //   this.setState({
    //     block: this.props.block
    //   })
    // }
    // if (prevState.block.text !== this.state.block.text) {
    //   this.props.update
    // }

    // if ((this.props !== prevProps || this.state.value !== prevState)) {
    //   if (this.props.block.id !== prevProps.block.id) {
    //     this.setState({
    //       id: this.props.id,
    //       value: this.props.value,
    //       type: this.props.type
    //     })
    //   }
//    if (this.props.updated !== prevProps.updated) {
//      this.setState({
//        ...this.state,
//        updated: this.props.updated
//      })
//    }

    let updatedObject = {}
    if (this.props.updatedElement !== prevProps.updatedElement) {
      this.setState({
        updatedElement: this.props.updatedElement
      })
    }
//    if (nextProps.updatedObject !== prevProps.updatedObject) {
//
//    }



    if (prevState.updatedElement !== this.state.updatedElement) {
//      updatedObject = {
//        updated_element: this.state.block.react_id,
//        update: {
//          ...this.state.updated
//        }
//      }
      this.props.updateParentContentBlock(this.state.block, this.state.updatedElement)
      //this.props.updateParentContentBlock(this.state.block)
    }
//else if (prevState.updated.updated_element !== this.state.updated.updated_element) {
//      updatedObject = {
//        updated_element: this.state.block.react_id,
//        update: {
//          ...this.state.updated
//        }
//      }
//      debugger
//      this.props.updateParentContentBlock(this.state.block, updatedObject)
//    }

//    if (this.props.updated.updated_element !== prevState.updated.updated_element) {
//      this.setState({
//        ...this.state,
//        updated: this.props.updated
//      })
//    }
//
//    if (prevState.block.text !== this.state.block.text) {
//      // check constraints or if something should happen when this.state.value === ''
//      this.props.updateParentContentBlock(this.state.block, {updated_element: this.state.block.react_id, ...this.state.updated})
//    }
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


//      console.log('should update', nextState)
//      return true
//      if (nextState.updated.includes(this.myRef.current)) {
//        return true
//      }
//
//      if (nextState.block.text !== this.state.block.text) {
//        return true
//      }
//      return false
//
//    if (nextProps.updated.includes(this.myRef.current)) {
//      return true
//    }
//    if (nextState.block.text !== this.state.block.text) {
//      return true
//    }
//    return false
//    }
    // if (this.state.block.text != nextState.block.text) {return true}
    // if (nextProps.updated.content_block_id === this.props.block.id) {
    //   return true
    // }
    // return false
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
  // }

  onKeyDownHandler = (e) => {
    if (e.key === "/") {
      this.setState({ valueBackup: this.state.value });
    }
    if (e.key === "Enter" && !this.state.selectMenuIsOpen) {
      if (this.state.previousKey !== "Shift") {
        e.preventDefault();
        this.props.addBlockHandler(this.props.block);
      }
    }
    // if (e.key === "Backspace" && !this.state.value) {
    //   e.preventDefault();
    //   if (this.state.type === Types.PARAGRAPH) {
    // //  delete Block
    //     this.props.deleteBlock({
    //       id: this.props.id,
    //       ref: this.myRef.current
    //     });
    //   } else{
    //  //   change Type to Paragraph
    //     this.setState({ type: Types.PARAGRAPH, value: '' })
    //   }
    // }
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
        elementId: this.state.block.id,
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
        elementId: block.id
      }
    })
    // this.props.updateOutline({...this.props.block, text: e.target.value}, {content_block_id: this.props.block.id})
  }


  render(){
    const block = this.state.block
    console.log('render', this.state.block.text)
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
              />
            )
        }
      </div>
    ]
  }
}

export default EditContentBlock
