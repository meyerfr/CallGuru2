import React from 'react';

const NumberInput = (props) => {
  return (
    <div className="outline-script">
      <span>{props.content_block.text}</span>
      <input type="number" value={props.form_value} placeholder="Type a number" onChange={(e) => props.onChange(props.content_block, e)} />
    </div>
  );
};

export default NumberInput;

