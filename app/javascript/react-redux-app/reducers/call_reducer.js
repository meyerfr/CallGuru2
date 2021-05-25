import { CREATE_CALL, FETCH_CALL, UPDATE_CALL_STATE } from '../actions'

export default function callReducer(state = null, action) {
  switch (action.type) {
    case CREATE_CALL:
    case FETCH_CALL:
      return action.payload;
    default:
      return state;
  }
}
