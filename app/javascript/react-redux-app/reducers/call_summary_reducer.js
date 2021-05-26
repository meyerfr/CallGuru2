import { CREATE_CALL, FETCH_CALL, UPDATE_CALL_STATE } from '../actions'

export default function callSummaryReducer(state = null, action) {
  let copiedState = state
  let contentBlockHelper = []
  switch (action.type) {
    case CREATE_CALL:
    case FETCH_CALL:
      let copiedSections = action.payload.playbook.sections
      let summary = {
        id: null,
        summaryContentBlocks: []
      }

      copiedSections.forEach((section) => {
        section.outlines.forEach((outline) => {
          contentBlockHelper = outline.content_blocks
          contentBlockHelper.forEach((contentBlock) => contentBlock.content_type.form_input && summary.summaryContentBlocks.push(contentBlock))
        })
      })
      return summary;
    case UPDATE_CALL_STATE:
      let toBeUpdatedIndex
      let copySummaryContentBlocks = state.summaryContentBlocks
      action.payload.forEach((contentBlock) => {
        if (contentBlock.content_type.form_input) {
          toBeUpdatedIndex = copySummaryContentBlocks.findIndex((summaryContentBlock) => summaryContentBlock.id === contentBlock.id)
          copySummaryContentBlocks[toBeUpdatedIndex] = contentBlock
        }
      })

      return {
        ...state,
        summaryContentBlocks: copySummaryContentBlocks
      }
    default:
      return state;
  }
}
