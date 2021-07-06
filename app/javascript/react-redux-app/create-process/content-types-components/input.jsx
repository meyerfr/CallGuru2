import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

class Input extends Component {
  expandNumberInput = (event) => {
    const target = event.target
    const span = target.previousElementSibling.innerHTML = target.value
  }

  // Dealing with Textarea Height
  expandTextarea = (event) => {
    let numberOfLineBreaks = (event.target.innerHTML.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 38 + numberOfLineBreaks * 18;

    event.target.style.hight = newHeight + 'px';
  }


  render() {
    const { block, editable, onChange } = this.props

    const contentType = block.content_type
    let placeholder = ''
    switch(contentType.style) {
      case 'number':
        placeholder = 'Number'
        break;
      case 'text':
        placeholder = 'Enter answer'
        break;
    }

    if (editable) {
      return(
        <span key="editableSpan" ref={this.props.myRef} contentEditable className={`block-input ${block.content_type.style}`} key="outlineTitle" onKeyDown={this.props.onKeyDown} onChange={this.props.onChange} suppressContentEditableWarning={true}>{block.text}</span>
      )
    } else{
      switch (contentType.style) {
        case 'number':
          return[
            <span key={block.id} className="block">{block.text}</span>,
            <div className={`blocks input form-field${contentType.style === 'range' ? ' range inline' : ` ${contentType.style}`}`} key={`${block.id}-blocks`}>
              <span className="width-machine" aria-hidden="true">99</span>
              <input type={contentType.style} value={block.summary_item.simple_answer_attributes.content} onKeyUp={this.expandNumberInput} onChange={(e) => onChange(block, e)} placeholder={placeholder} />
            </div>
          ]
          break;
        case 'text':
          return[
            <span key={block.id} className="block">{block.text}</span>,
            <div className={`blocks input form-field${contentType.style === 'range' ? ' range inline' : ` ${contentType.style}`}`} key={`${block.id}-blocks`}>
              <span className="textarea text" role="textbox" contentEditable onChange={(e) => onChange(block, e)} onKeyUp={this.expandTextarea}>{block.summary_item.simple_answer_attributes.content}</span>
            </div>
          ]
        default:
          return [
            <span key={block.id} className="block">{block.text}</span>,
            <div className={`blocks input form-field${contentType.style === 'range' ? ' range inline' : ` ${contentType.style}`}`} key={`${block.id}-blocks`}>
              <input type={contentType.style} value={block.summary_item.simple_answer_attributes.content} onChange={(e) => onChange(block, e)} placeholder={placeholder} />
              {
                contentType.style === 'range' &&
                <div className="range-info">
                  <span>{block.summary_item.simple_answer_attributes.content}</span>
                  <span>%</span>
                </div>
              }
            </div>
          ];
      }
    }
  }
};


export default Input;

