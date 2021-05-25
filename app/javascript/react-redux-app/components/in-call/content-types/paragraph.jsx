import React from 'react';

const Paragraph = ({content_block}) => {
  return (
    <div className="outline-script">
      <span className={content_block.content_type.style}>{content_block.text}</span>
    </div>
  );
};

export default Paragraph;

