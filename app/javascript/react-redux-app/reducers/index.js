import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { CREATE_COMPANY, ADD_EMPLOYEE } from '../actions'

import companiesReducer from './companies_reducer'
import playbooksReducer from './playbooks_reducer'
import sectionsReducer from './sections_reducer'

const identityReducer = (state = null, action) => state;

const rootReducer = combineReducers({
  currentUser: identityReducer,
  companies: companiesReducer,
  playbooks: playbooksReducer,
  sections: sectionsReducer,
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
