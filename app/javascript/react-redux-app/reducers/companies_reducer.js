import { FETCH_COMPANIES, CREATE_COMPANY, FETCH_USERS, ADD_EMPLOYEE, UPDATE_COMPANY } from '../actions'

export default function companiesReducer(state = null, action) {
  let copiedCompanies = []
  switch (action.type) {
    case CREATE_COMPANY:
      return state.concat(action.payload);
    case FETCH_COMPANIES:
      return action.payload;
    case FETCH_USERS:
      copiedCompanies = state.slice(0)
      return (
        copiedCompanies.map((company) => {
          if (company.id == action.payload[0].company_id) {
            return {
              ...company,
              users: action.payload
            }
          }
          return company
        })
      )
    case ADD_EMPLOYEE:
      copiedCompanies = state.slice(0)
      return (
        copiedCompanies.map((company) => {
          if (company.id == action.payload.company_id) {
            return {
              ...company,
              users: company.users.concat(action.payload)
            }
          }
          return company
        })
      )
    default:
      return state;
  }
}
