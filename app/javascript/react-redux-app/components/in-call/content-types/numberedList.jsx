import React from 'react';

const NumberedList = ({content_block}) => {
  return (
    <div className="outline-script">
      <ol>
        {
          content_block.content_options.map((content_option, index) =>
            <li key={content_option.id}>{content_option.name}</li>
          )
        }
      </ol>
    </div>
  );
};

export default NumberedList;

