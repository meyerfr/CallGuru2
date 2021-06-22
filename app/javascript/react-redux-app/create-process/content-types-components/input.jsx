import React from 'react';

const Input = ({ block, editable, onChange }) => {
  const contentType = block.content_type

  return (
    <div className="block input">
      <span>{block.text}</span>
      <input type={contentType.style} value={block.summary_item.simple_answer_attributes.content} onChange={(e) => onChange(block, e)} />
      <span>{block.summary_item.simple_answer_attributes.content} %</span>
    </div>
  );
};


export default Input;

