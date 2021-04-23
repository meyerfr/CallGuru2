import React from 'react';

const Default = ({content_block}) => {
  return (
    <div className="outline-script">
      <span>{content_block.text}</span>
      {
        content_block.content_options.map((content_option, index) =>
          <span key={content_option.id}>{content_option.name}</span>
        )
      }
    </div>
  );
};

export default Default;

