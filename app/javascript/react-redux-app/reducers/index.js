import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { CREATE_COMPANY, ADD_EMPLOYEE } from '../actions'

import companiesReducer from './companies_reducer'
import playbooksReducer from './playbooks_reducer'
import sectionsReducer from './sections_reducer'
import callReducer from './call_reducer'
import userReducer from './user_reducer'
import callSummaryReducer from './call_summary_reducer'
import contentTypesReducer from './content_types_reducer'

const identityReducer = (state = null, action) => state;

const rootReducer = combineReducers({
  currentUser: userReducer,
  companies: companiesReducer,
  playbooks: playbooksReducer,
  sections: sectionsReducer,
  call: callReducer,
  callSummary: callSummaryReducer,
  contentTypes: contentTypesReducer,
  form: formReducer.plugin({
    newCompanyForm: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case CREATE_COMPANY:
          return undefined;       // <--- blow away form data
        default:
          return state;
      }
    },
    addEmployeeForm: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case ADD_EMPLOYEE:
          return undefined;       // <--- blow away form data
        default:
          return state;
      }
    }
  })
});

export default rootReducer;
