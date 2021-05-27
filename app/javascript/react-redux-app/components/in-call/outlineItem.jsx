import React from 'react';


import Paragraph from './content-types/paragraph'
import BulletList from './content-types/bulletList'
import List from './content-types/list'
import SimpleSelect from './content-types/simpleSelect'
import MultiSelect from './content-types/multiSelect'
import NumberInput from './content-types/numberInput'
import TextInput from './content-types/textInput'
import DefaultInput from './content-types/defaultInput'


const OutlineItem = (props) => {
  const {content_block, id} = props

  console.log(content_block)
  switch (content_block.content_type.group) {
    case 'text':
      return <Paragraph content_block={content_block} />
      break;
    case 'multiselect':
      return <MultiSelect content_block={content_block} selected={props.form_value} onChange={props.onMultiSelectChange} />
      break;
    case 'select':
      return <SimpleSelect content_block={content_block} selected={props.form_value} onChange={props.onSelectChange} />
      break;
    case 'list':
      return <List content_block={content_block} />
      break;
    case 'input':
      return <DefaultInput content_block={content_block} form_value={props.form_value} onChange={props.onInputChange} />
      break;
    default:
      return <span className="outline-script">{content_block.content_type.name} Doesn't exist</span>;
  }
};

export default OutlineItem;
