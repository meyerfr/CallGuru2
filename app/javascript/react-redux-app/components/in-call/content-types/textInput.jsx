import React from 'react';

const TextInput = (props) => {
  return (
    <div className="outline-script">
      <span>{props.content_block.text}</span>
      <input type="text" value={props.form_value} placeholder="Type a text" onChange={(e) => props.onChange(props.content_block, e)} />
    </div>
  );
};

export default TextInput;

