import React from 'react';

const List = ({content_block}) => {
  switch (content_block.content_type.style) {
    case 'bullet':
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
    case 'numbered':
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
    default:
      return <span className="outline-script">{content_block.content_type.style} - No Component for List style</span>;
  }
};

export default List;

