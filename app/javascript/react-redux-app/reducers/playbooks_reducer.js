import { FETCH_PLAYBOOKS, FETCH_PLAYBOOK, UPDATE_PLAYBOOK, UPLOAD_AVATAR, UPDATE_SECTION, CREATE_SECTION } from '../actions'

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
    case UPLOAD_AVATAR:
      copiedPlaybooks = state.slice(0)
      return (
        copiedPlaybooks.map((playbook) => {
          if (playbook.owner.id == action.payload.id) {
            return {
              ...playbook,
              owner: action.payload
            }
          }
          return playbook
        })
      )
    case UPDATE_SECTION:
      copiedPlaybooks = state.map((playbook) => {
        if (playbook.id === action.payload.playbook_id) {
          return{
            ...playbook,
            sections_attributes: playbook.sections_attributes.map((section) => {
              if (section.id === action.payload.id) {
                return action.payload
              }
              return section
            })
          }
        }
        return playbook
      })

      return copiedPlaybooks
    case CREATE_SECTION:
      copiedPlaybooks = state.map((playbook) => {
        if (playbook.id == action.payload.playbook_id) {
          return {...playbook, sections_attributes: [...playbook.sections_attributes, action.payload]}
        }
        return playbook
      })
      return copiedPlaybooks
    default:
      return state;
  }
}
