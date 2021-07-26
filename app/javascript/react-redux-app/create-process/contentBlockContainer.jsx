import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uuid, setCaretToEnd } from './helperFunctions'
import { Link } from 'react-router-dom'

import ContentBlock from './contentBlock'

class ContentBlockContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      blocks: props.blocks,
      myRefs: []
    }
  }

  componentDidMount(){
    let elRefs = []

    this.props.blocks.forEach((block, index) => {
      elRefs.push({
        thisRef: React.createRef(),
        blockContainerRef: block.content_blocks_attributes.length > 0 ? React.createRef() : null
      })
    })
    this.setState({
      myRefs: elRefs
    })
  }


  // createRefTree = (block) => {
  //   if (block.content_blocks_attributes.length > 0) {
  //     let blockRef = {
  //       blockRef: React.createRef(),
  //       childrenRef: createRefTree(block.content_blocks_attributes)
  //     }
  //   }
  // }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.blocks.length !== this.state.blocks.length) {

    }
  }


  addBlock = (currentBlock, updatedElement, ref) => {
    const currentBlocksCopy = this.state.blocks
    const contentType = this.props.contentTypes.find((type) => type.group === 'text' && type.style === 'paragraph')
    const currentBlockIndex = currentBlocksCopy.map((block) => block.react_id).indexOf(currentBlock.react_id)
    const newBlock = {
      id: null,
      contentable_type: 'ContentBlock',
      contentable_id: this.props.parent.id,
      content_type_id: contentType.id,
      text: '',
      order_no: null,
      content_blocks_attributes: [],
      _destroy: '1',
      react_id: uuid(),
      content_type: contentType
    }

    currentBlocksCopy.splice(currentBlockIndex + 1, 0, newBlock)

    const myRefsCopy = this.state.myRefs
    myRefsCopy.splice(currentBlockIndex + 1, 0, {thisRef: React.createRef(), blockContainerRef: null})

    this.setState({
      ...this.state,
      blocks: currentBlocksCopy,
      myRefs: myRefsCopy
    }, () => {
      myRefsCopy[currentBlockIndex + 1].thisRef.current.focus()
    })
  }

  deleteBlock = (currentBlock, updatedObject, index) => {
    const currentFocusIndex = index
    this.setState({
      blocks: this.state.blocks.filter((block) => block.react_id !== currentBlock.react_id),
      myRefs: this.state.myRefs.filter((ref, i) => i !== index)
    }, () => {
      this.focusPrevBlock(currentFocusIndex)
    })
  }

  focusPrevBlock = (index) => {
    if (index > 0) {
      if (this.state.myRefs[index - 1].blockContainerRef) {
        // console.log(this.state.myRefs[index - 1].blockContainerRef)
        this.state.myRefs[index - 1].blockContainerRef.current.innerText = ''
        this.state.myRefs[index - 1].blockContainerRef.current.click()
      } else{
        this.state.myRefs[index - 1].thisRef.current.focus()
      }
    }else{
      this.props.prevBlock(this.props.parentIndex)
    }
  }

  prevBlock = (thisIndex) => {
    // console.log(this.props)
    // console.log(this.state)
    // console.log(this.state.myRefs)
    if (this.state.myRefs[thisIndex].thisRef.current) {
      this.state.myRefs[thisIndex].thisRef.current.focus()
    } else{
      if (thisIndex > 0) {
        this.state.myRefs[thisIndex - 1].thisRef.current.focus()
      }
    }
    // if (index > 0) {
    //   this.state.refs[index-1].current.focus()
    // } else{
    //   this.props.deleteBlock({})
    // }
  }

  focusNextBlock = (thisIndex, currentRef) => {
    // check if this.element has content_blocks_attributes && nicht currently focused => focusBlock
    // if no content_blocks_attributes
    //    if index is last index of block
            // nextelementof parent
          // else
            // nextElement.focus

    const myRefs = this.state.myRefs

    if (myRefs[thisIndex].blockContainerRef && currentRef === 'thisRef') {
      myRefs[thisIndex].blockContainerRef.current.innerText = 'first Element'
      myRefs[thisIndex].blockContainerRef.current.click()
      return
    } else if(myRefs.length - 1 === thisIndex){
      this.props.focusNextBlock(this.props.index, 'blockContainerRef')
    } else{
      myRefs[thisIndex + 1].thisRef.current.focus()
    }

    // if (this.myRefs.blockContainerRef === currentRef) {

    // }
    // if (myRefs.length - 1 ===  thisIndex) {
    //   debugger
    //   this.props.focusNextBlock(thisIndex)
    // }

    // if (myRefs.length - 1 === thisIndex) {
    //   // if (!currentRef) {
    //   //   myRefs[thisIndex].thisRef.current.focus()
    //   // }else
    //   if (myRefs[thisIndex].thisRef == currentRef && myRefs[thisIndex].blockContainerRef) {
    //     console.log(myRefs[thisIndex].blockContainerRef.current)
    //     myRefs[thisIndex].blockContainerRef.current.innerText = 'first Element'
    //     myRefs[thisIndex].blockContainerRef.current.click()
    //   } else{
    //     if (this.props.focusNextBlock) {
    //       console.log(this.props.index)
    //       this.props.focusNextBlock(this.props.index)
    //     }
    //     // myRefs[thisIndex + 1].thisRef.current.focus()
    //   }
    // } else{
    //   // if (myRefs[thisIndex].blockContainerRef) {
    //   //   myRefs[thisIndex].blockContainerRef.current.click()
    //   // } else{
    //     myRefs[thisIndex + 1].thisRef.current.focus()
    //   // }
    // }
  }

  handleFocus = (e) => {
    const copyMyRefs = this.state.myRefs
    let nextRef
    const targetText = e.currentTarget.innerText
    e.currentTarget.innerText = ''
    if (targetText === 'first Element') {
      nextRef = copyMyRefs[0]
    } else{
      nextRef = copyMyRefs[copyMyRefs.length - 1]
    }
    if (nextRef) {
      if (targetText === 'first Element') {
        targetText === ''
        if (nextRef.thisRef) {
          nextRef.thisRef.current.focus()
        } else if(nextRef.blockContainerRef){
          nextRef.blockContainerRef.current.click()
        }
      }else{
        if (nextRef.blockContainerRef) {
          if (targetText === 'first Element') {
            targetText === ''
          }
          nextRef.blockContainerRef.current.click()
        }else{
          nextRef.thisRef.current.focus()
        }
      }
    } else{
      this.props.prevBlock(this.props.parentIndex)
    }
  }

  handleClick = () => {
    setTimeout(() => {
      debugger
    })
  }

  render(){
    const {blocks, myRefs} = this.state
    // console.log('blocks', blocks)
    // console.log('props', this.props)
    console.log(myRefs)
    return(
      <div className="content-block-container">
        <div className="d-none" ref={this.props.myRef} onClick={this.handleFocus} onFocus={this.handleClick}></div>
        {
          blocks.map((block, index) => {
            if (block.content_blocks_attributes.length > 0) {
              return [
                <ContentBlock
                  block={block}
                  key={block.react_id}
                  myRef={myRefs[index]?.thisRef}
                  addBlock={this.addBlock}
                  deleteBlock={this.deleteBlock}
                  index={index}
                  focusPrevBlock={() => this.focusPrevBlock(index)}
                  focusNextBlock={this.focusNextBlock}
                />,
                <ContentBlockContainer
                  blocks={block.content_blocks_attributes}
                  key={`blockContainer${block.react_id}`}
                  block={block}
                  myRef={myRefs[index]?.blockContainerRef}
                  parent={block}
                  index={index}
                  parentIndex={index || 0}
                  lastElementOfPrevBlockContainer={this.lastElementOfPrevBlockContainer}
                  prevBlock={this.prevBlock}
                  contentTypes={this.props.contentTypes}
                  focusNextBlock={this.focusNextBlock}
                />
              ]
            }
            return <ContentBlock
                    block={block}
                    key={block.react_id}
                    myRef={myRefs[index]?.thisRef}
                    addBlock={this.addBlock}
                    deleteBlock={this.deleteBlock}
                    index={index}
                    focusPrevBlock={() => this.focusPrevBlock(index)}
                    focusNextBlock={this.focusNextBlock}
                   />
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


export default connect(mapStateToProps, null)(ContentBlockContainer);
