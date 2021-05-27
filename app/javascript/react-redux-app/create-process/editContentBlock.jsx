import React, { Component } from 'react'

import EditContentOption from './editContentOption'

class EditContentBlock extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectMenuIsOpen: false,
      previousKey: '',
      block: props.block
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
    if (prevState.block.text !== this.state.block.text) {
      // check constraints or if something should happen when this.state.value === ''
      this.props.updateOutline(this.state.block, {content_block_id: this.props.block.id})
    }
  }


  // shouldComponentUpdate(nextProps, nextState){
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
      this.setState({ valueBackup: this.state.value }, () => console.log(this.state));
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

    this.setState({ previousKey: e.key });
  }


  updateContentOption = (contentOption, updatedObject={}) => {
    let copiedContentBlocksContentOptions = this.props.block.content_options_attributes
    let contentOptionReactId = contentOption.react_id
    let toBeUpdatedContentOptionIndex = copiedContentBlocksContentOptions.findIndex((option) => option.react_id === contentOptionReactId)
    copiedContentBlocksContentOptions[toBeUpdatedContentOptionIndex] = contentOption

    this.props.updateOutline({...this.props.block, content_options_attributes: copiedContentBlocksContentOptions}, {content_block_id: this.props.block.id, ...updatedObject})
  }

  onNameUpdate = (e) => {
    let block = {
      ...this.state.block,
      text: e.target.value
    }

    this.setState({
      block: block
    })
    // this.props.updateOutline({...this.props.block, text: e.target.value}, {content_block_id: this.props.block.id})
  }


  render(){
    // if (!this.props.value) {console.log('undefined', this.props)}
    const block = this.state.block
    return[
      <div key="contentBlock" style={{display: 'grid'}}>
        <span>{block.content_type.style}</span>
        {
          block.content_type.group !== 'list' &&
            <input key="outlineTitle" onKeyDown={this.onKeyDownHandler} value={block.text} onChange={this.onNameUpdate} placeholder="contentBlock Text" />
        }
        {
          block.content_options_attributes.map((option) =>
            <EditContentOption
              key={option.react_id}
              value={option.name}
              option={option}
              updateContentBlock={this.updateContentOption}
              updated={this.props.updated}
            />
          )
        }
      </div>,
      <button key="addBlockButton" onClick={() => this.props.addBlockHandler()}>Add Block</button>
      // <div key="contentBlockWrapper" className="section-wrapper">
      //   {
      //     block.content_options_attributes.map((option) =>
      //       <span key={option.react_id}>1{option.name}</span>
      //     )
      //   }
      // </div>
    ]
  }
}

export default EditContentBlock
