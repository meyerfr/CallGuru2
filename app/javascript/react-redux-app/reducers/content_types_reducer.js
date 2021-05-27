import { FETCH_CONTENT_TYPES } from '../actions'

export default function contentTypesReducer(state = null, action) {
  switch (action.type) {
    case FETCH_CONTENT_TYPES:
      return action.payload
    // case FETCH_CONTENT_TYPES:
    //   let contentTypes = action.payload

    //   let newState = []

    //   contentTypes.forEach((contentType) => {
    //     switch (contentType.group) {
    //       case 'text':
    //         {
    //           contentType
    //         }
    //       case 'list':

    //     }

    //     // Templates
    //   })


    //   let copiedSections = action.payload.playbook.sections
    //   let summary = {
    //     id: null,
    //     summaryContentBlocks: []
    //   }

    //   copiedSections.forEach((section) => {
    //     section.outlines.forEach((outline) => {
    //       contentBlockHelper = outline.content_blocks
    //       contentBlockHelper.forEach((contentBlock) => contentBlock.content_type.form_input && summary.summaryContentBlocks.push(contentBlock))
    //     })
    //   })
    //   return summary;
    // case UPDATE_CALL_STATE:
    //   let toBeUpdatedIndex
    //   let copySummaryContentBlocks = state.summaryContentBlocks
    //   action.payload.forEach((contentBlock) => {
    //     if (contentBlock.content_type.form_input) {
    //       toBeUpdatedIndex = copySummaryContentBlocks.findIndex((summaryContentBlock) => summaryContentBlock.id === contentBlock.id)
    //       copySummaryContentBlocks[toBeUpdatedIndex] = contentBlock
    //     }
    //   })

    //   return {
    //     ...state,
    //     summaryContentBlocks: copySummaryContentBlocks
    //   }
    default:
      return state;
  }
}
