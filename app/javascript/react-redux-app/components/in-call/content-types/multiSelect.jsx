import React from 'react';

const MultiSelect = ({content_block, selected, onChange}) => {
  console.log('MultiSelect', content_block.summary_item)
  return (
    <div className="outline-script">
      <span>{content_block.text}</span>
      {
        content_block.content_options.map((content_option, index) =>{
          return(
            <div className="d-flex" key={content_option.id}>
              <input type="checkbox" id={content_option.id} value={content_option.name} checked={selected?.includes(content_option.id)} onChange={() => onChange(content_block, content_option.id)} />
              <label className="label" htmlFor={content_option.id}>{content_option.name}</label>
            </div>
          )
        })
      }
    </div>
  );
};

export default MultiSelect;

