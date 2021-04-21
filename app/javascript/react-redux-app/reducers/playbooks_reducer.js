import { FETCH_PLAYBOOKS, FETCH_PLAYBOOK } from '../actions'

export default function playbooksReducer(state = null, action) {
  let copiedPlaybooks = []
  switch (action.type) {
    case FETCH_PLAYBOOKS:
      return action.payload;
    case FETCH_PLAYBOOK:
      const payloadPlaybook = state.find((playbook) => playbook.id == action.payload.id)
      if (payloadPlaybook == undefined) {
        return state.concat(action.payload);
      }

      copiedPlaybooks = state.slice(0)
      return (
        copiedPlaybooks.map((playbook) => {
          if (playbook.id == action.payload.id) {
            return action.payload
          }
          return playbook
        })
      )
    default:
      return state;
  }
}
