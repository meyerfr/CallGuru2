import React from 'react';

const MultiSelect = ({content_block}) => {
  return (
    <div className="outline-script">
      <ul>
        {
          content_block.content_options.map((content_option, index) =>
            <li key={content_option.id}>{content_option.name}</li>
          )
        }
      </ul>
    </div>
  );
};

export default MultiSelect;

