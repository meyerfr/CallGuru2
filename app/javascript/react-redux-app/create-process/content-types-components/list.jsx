import React from 'react';

import EditContentBlock from '../editContentBlock'

const List = ({ block, editable, updatedElement, updateParentContentBlock }) => {
  const contentType = block.content_type
  switch (contentType.style) {
    case 'bullet':
      return(
        <div className="blocks list bullet">
          {
            block.content_blocks_attributes.map((block) =>
              <EditContentBlock
                updatedObject={updatedElement}
                editable={editable}
                key={block.id}
                value={block.text}
                block={block}
                classPrefix="list-item"
                updateParentContentBlock={updateParentContentBlock}
              />
            )
          }
        </div>
      );
    case 'numbered':
      return(
        <div className="blocks list numbered">
          {
            block.content_blocks_attributes.map((block) =>
              <EditContentBlock
                updatedObject={updatedElement}
                editable={editable}
                key={block.id}
                value={block.text}
                block={block}
                classPrefix="list-item"
                updateParentContentBlock={updateParentContentBlock}
              />
            )
          }
        </div>
      );
    default:
      return <span className="outline-script">{contentType.style} - No Component for List style</span>;
  }
};

export default List;

