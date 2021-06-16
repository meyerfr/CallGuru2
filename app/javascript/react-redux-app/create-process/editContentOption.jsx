import React, { Component } from 'react'

class EditContentOption extends Component{

  shouldComponentUpdate(nextProps){

    if (nextProps.updated.content_option_id === this.props.option.id) {

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

  // updateContentOption = (contentOption, updatedObject={}) => {
  //   let copiedContentBlocksContentOptions = this.state.props.block.content_options_attributes
  //   let contentOptionReactId = contentOption.react_id
  //   let toBeUpdatedContentOptionIndex = copiedContentBlocksContentOptions.findIndex((option) => option.react_id === contentOptionReactId)
  //   copiedOutlineContentBlocks[toBeUpdatedContentOptionIndex] = contentOption

  //   this.props.updateOutline({...this.props.block, content_options_attributes: copiedOutlineContentBlocks}, {content_block_id: this.props.block.id, ...updatedObject})
  // }

  onNameUpdate = (e) => {
    this.props.updateContentBlock({...this.props.option, name: e.target.value}, {content_option_id: this.props.option.id})
  }


  render(){
    if (!this.props.value) {console.log('undefined', this.props)}
    return(
      <input key="contentOption" value={this.props.value} onChange={this.onNameUpdate} placeholder="contentOption Text" />
      // <div key="contentBlockWrapper" className="section-wrapper">
      //   {
      //     this.props.block.content_options_attributes.map((option) =>
      //       <span key={option.react_id}>1{option.name}</span>
      //     )
      //   }
      // </div>
    )
  }
}

export default EditContentOption
