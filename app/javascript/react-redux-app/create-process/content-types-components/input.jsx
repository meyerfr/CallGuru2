import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

const Input = ({ block, editable, onChange }) => {
  const contentType = block.content_type

  switch (contentType.style) {
    // case 'range':
    //   return [
    //     <span key={block.id} className="block">{block.text}</span>,
    //     <InputRange
    //       maxValue={100}
    //       minValue={0}
    //       value={parseInt(block.summary_item.simple_answer_attributes.content || 0)}
    //       onChange={e => onChange(block, e)}
    //     />
    //   ];
    default:
      return [
        <span key={block.id} className="block">{block.text}</span>,
        <div className={`blocks input form-field${contentType.style === 'range' ? ' range inline' : ` ${contentType.style}`}`} key={`${block.id}-blocks`}>
          <input type={contentType.style} value={block.summary_item.simple_answer_attributes.content} onChange={(e) => onChange(block, e)} />
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
};


export default Input;

