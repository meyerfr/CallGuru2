import React from 'react';

import { updateCallState } from '../actions'

import OutlineItem from '../components/in-call/outlineItem'

const ContentBlocks = ({ content_blocks, updateContentBlock }) => {
  const onInputChange = (content_block, event) => {
    event.preventDefault()
    let copiedContentBlock = content_block
    copiedContentBlock.summary_item.simple_answer_attributes.content = event.target.value
    if (copiedContentBlock.summary_item.simple_answer_attributes.content === '') {
      copiedContentBlock.summary_item._destroy = '1'
    } else{
      copiedContentBlock.summary_item._destroy = '0'
    }
    updateContentBlock(copiedContentBlock)
  }

  const onSelectChange = (content_block, content_option_id) => {
    let copiedContentBlock = content_block
    copiedContentBlock.summary_item.content_options_summary_items_attributes.content_option_id = content_option_id
    copiedContentBlock.summary_item._destroy = '0'
    updateContentBlock(copiedContentBlock)
  }

  const onMultiSelectChange = (content_block, content_option_id) => {
    let copiedContentBlock = content_block
    let copiedContentSummaryOptionsAttributes = content_block.summary_item.content_options_summary_items_attributes

    copiedContentSummaryOptionsAttributes = copiedContentSummaryOptionsAttributes.map((content_options_summary_item => {
      if (content_options_summary_item.content_option_id === content_option_id) {
        let destroy = content_options_summary_item._destroy === '1' ? '0' : '1'
        let new_content_options_summary_item = {
          ...content_options_summary_item,
          _destroy: destroy
        }
        return new_content_options_summary_item
      }
      return content_options_summary_item
    }))

    copiedContentBlock.summary_item.content_options_summary_items_attributes = copiedContentSummaryOptionsAttributes
    updateContentBlock(copiedContentBlock)
  }

  return(
    content_blocks.map((content_block, index) => {
      switch (content_block.content_type.group) {
        case 'multiselect':
          let content_option_ids = []
          content_block.summary_item.content_options_summary_items_attributes.forEach((item) => item._destroy === '1' && content_option_ids.push(item.content_option_id))
          return <OutlineItem content_block={content_block} form_value={content_option_ids} key={content_block.id} onMultiSelectChange={onMultiSelectChange} />
          break;
        case 'select':
          return <OutlineItem content_block={content_block} form_value={content_block.summary_item.content_options_summary_items_attributes.content_option_id} key={content_block.id} onSelectChange={onSelectChange} />
          break;
        case 'list':
          return <OutlineItem content_block={content_block} key={content_block.id} />
          break;
        case 'input':
          return <OutlineItem content_block={content_block} form_value={content_block.summary_item.simple_answer_attributes.content} key={content_block.id} onInputChange={onInputChange} />
          break;
        default:
          return <OutlineItem content_block={content_block} key={content_block.id} />
      }
    })
  )
}

export default ContentBlocks
