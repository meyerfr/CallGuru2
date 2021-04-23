import React from 'react';

import Default from './content-types/default'
import BulletList from './content-types/bulletList'
import NumberedList from './content-types/numberedList'
import SimpleSelect from './content-types/simpleSelect'
import MultiSelect from './content-types/multiSelect'
import NumberInput from './content-types/numberInput'

const OutlineItem = ({content_block, id}) => {
  switch (content_block.content_type.name) {
    case 'default':
      console.log('default');
      return <Default content_block={content_block} />
      break;
    case 'multiple select':
      console.log('multiple select');
      return <MultiSelect content_block={content_block} />
      break;
    case 'simple select':
      console.log('simple select');
      return <SimpleSelect content_block={content_block} />
      break;
    case 'numbered list':
      console.log('numbered list');
      return <NumberedList content_block={content_block} />
      break;
    case 'bullet list':
      console.log('bullet list');
      return <BulletList content_block={content_block} />
      break;
    default:
      return <span>{content_block.content_type.name} Doesn't exist</span>;
  }
};

export default OutlineItem;
