import { UPDATE_USER, UPLOAD_AVATAR, UPLOAD_LOGO, UPDATE_COMPANY } from '../actions'

export default function callReducer(state = null, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    case UPLOAD_AVATAR:
      return {
        ...state,
        avatar: action.payload.avatar
      }
    case UPDATE_COMPANY:
      return {
        ...state,
        company: action.payload
      };
    case UPLOAD_LOGO:
      return {
        ...state,
        company: {
          ...state.company,
          logo: action.payload.logo
        }
      }
    default:
      return state;
  }
}
