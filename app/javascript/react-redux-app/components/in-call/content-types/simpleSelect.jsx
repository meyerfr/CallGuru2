import React from 'react';

const SimpleSelect = ({content_block, selected, onChange}) => {
  switch (content_block.content_type.style) {
    case 'select':
    case 'dropdown':
      return (
        <div className="outline-script">
          <span>{content_block.text}</span>
          <div className="inline-list">
            {
              content_block.content_options.map((content_option, index) =>{
                return(
                  <div className="d-flex" key={content_option.id}>
                    <input type="radio" id={content_option.id} value={content_option.name} checked={selected === content_option.id} onChange={() => onChange(content_block, content_option.id)} />
                    <label className="label" htmlFor={content_option.id}>{content_option.name}</label>
                  </div>
                )
              })
            }
          </div>
        </div>
      );
    default:
      return <span className="outline-script">{content_block.content_type.style} - No Component for Select group</span>;
  }
};

export default SimpleSelect;

