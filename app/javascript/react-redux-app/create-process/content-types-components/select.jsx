import React from 'react';

import EditContentBlock from '../editContentBlock'

const Select = ({ block, editable, updatedElement, updateParentContentBlock, onClick }) => {
  const contentType = block.content_type
  let selected_block_ids = []

  if(block.content_type.style === 'multiselect'){
    block.summary_item.content_options_summary_items_attributes.forEach((item) => item._destroy === '0' && selected_block_ids.push(item.content_block_id))
  } else{
    selected_block_ids.push(block.summary_item.content_options_summary_items_attributes.content_block_id)
  }

  switch (contentType.style) {
    case 'select':
      return[
        <p className="block" key={block.id}>{block.text}</p>,
        <div className="blocks inline form-field select" key={`${block.id}-blocks`}>
          {
            block.content_blocks_attributes.map((block) =>
              <EditContentBlock
                updatedObject={updatedElement}
                editable={editable}
                key={block.id}
                value={block.text}
                block={block}
                onClick={onClick}
                selected={selected_block_ids.includes(block.id)}
                classPrefix="select-item select"
                updateParentContentBlock={updateParentContentBlock}
              />
            )
          }
        </div>
      ];
    case 'multiselect':
      return[
        <p className="block" key={block.id}>{block.text}</p>,
        <div className="blocks inline form-field multiselect" key={`${block.id}-blocks`}>
          {
            block.content_blocks_attributes.map((block) =>
              <EditContentBlock
                updatedObject={updatedElement}
                editable={editable}
                key={block.id}
                value={block.text}
                block={block}
                onClick={onClick}
                selected={selected_block_ids.includes(block.id)}
                classPrefix="select-item multiselect"
                updateParentContentBlock={updateParentContentBlock}
              />
            )
          }
        </div>
      ];
    default:
      return <span className="block">{contentType.style} - No Component for List style</span>;
  }
};

export default Select;

