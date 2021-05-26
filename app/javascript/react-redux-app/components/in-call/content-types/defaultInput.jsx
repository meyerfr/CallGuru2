import React from 'react';

const DefaultInput = ({content_block, form_value, onChange}) => {
  return (
    <div className="outline-script">
      <span>{content_block.text}</span>
      <input type={content_block.content_type.style} value={form_value} min="1" max="100" onChange={(e) => onChange(content_block, e)} />
    </div>
  );
};

export default DefaultInput;

