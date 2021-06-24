import { CREATE_CALL, FETCH_CALL, UPDATE_CALL_NAME, UPDATE_CALL_STATE } from '../actions'

export default function callReducer(state = null, action) {
  switch (action.type) {
    case CREATE_CALL:
    case FETCH_CALL:
    case UPDATE_CALL_STATE:
      return action.payload;
    case UPDATE_CALL_NAME:
      return {
        ...state,
        name: action.payload
      };
      // if (action.payload.length === 0) {
      //   return state
      // }
      // return {
      //   ...state,
      //   playbook: {
      //     ...state.playbook,
      //     sections: state.playbook.sections.map((section) => {
      //       if (section.id !== action.payload[0].contentable_id) {
      //         return section
      //       }else{
      //         return {
      //           ...section,
      //           content_blocks_attributes: action.payload
      //         }
      //       }
      //     })
      //   }
      // }
    default:
      return state;
  }
}
