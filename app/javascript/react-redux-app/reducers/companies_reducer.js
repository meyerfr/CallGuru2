import { FETCH_COMPANIES, CREATE_COMPANY, FETCH_USERS } from '../actions'

export default function companiesReducer(state = null, action) {
  switch (action.type) {
    case CREATE_COMPANY:
      return state.concat(action.payload);
    case FETCH_COMPANIES:
      return action.payload;

    case FETCH_USERS:
      const companies = state.slice(0)
      return (
        companies.map((company) => {
          if (company.id == action.payload[0].company_id) {
            return {
              ...company,
              users: action.payload
            }
          }
          return company
        })
      )
    default:
      return state;
  }
}
