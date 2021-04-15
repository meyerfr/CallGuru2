import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { CREATE_COMPANY } from '../actions'

import companiesReducer from './companies_reducer'

const identityReducer = (state = null, action) => state;

const rootReducer = combineReducers({
  currentUser: identityReducer,
  companies: companiesReducer,
  form: formReducer.plugin({
    newCompanyForm: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case CREATE_COMPANY:
          return undefined;       // <--- blow away form data
        default:
          return state;
      }
    }
  })
});

export default rootReducer;
