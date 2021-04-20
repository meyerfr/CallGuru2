import { FETCH_PLAYBOOKS } from '../actions'

export default function playbooksReducer(state = null, action) {
  let copiedCompanies = []
  switch (action.type) {
    case FETCH_PLAYBOOKS:
      return action.payload;
    default:
      return state;
  }
}
