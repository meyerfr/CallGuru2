import { FETCH_PLAYBOOK_SECTIONS } from '../actions'

export default function sectionsReducer(state = null, action) {
  let copiedSections = []
  switch (action.type) {
    case FETCH_PLAYBOOK_SECTIONS:
      return action.payload;
    default:
      return state;
  }
}
