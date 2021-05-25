import { FETCH_PLAYBOOK_SECTIONS, FETCH_CALL, CREATE_CALL } from '../actions'

export default function sectionsReducer(state = null, action) {
  let copiedSections = []
  switch (action.type) {
    case FETCH_PLAYBOOK_SECTIONS:
      return action.payload;
    case FETCH_CALL:
    case CREATE_CALL:
      return action.payload.playbook.sections
    default:
      return state;
  }
}
