import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Route } from 'react-router-dom';
import PageHeader from './pageHeader'
import PersonalSettings from '../containers/personalSettings'
import CompanySettings from '../containers/companySettings'

const Settings = (props) => {
  const settingProps = props
  return (
    <div className="app-wrapper settings">
      <PageHeader key="PageHeader" page="Settings">
        {
          <div className="tabs">
            <NavLink activeClassName="active" className="tab" exact to={`/settings`}>
              <span className="normal bold">Personal</span>
            </NavLink>
            <NavLink activeClassName="active" className="tab" exact to={`/settings/company`}>
              <span className="normal bold">Company</span>
            </NavLink>
          </div>
          // <div className="actions">
          //   <button>Action</button>
          // </div>
        }
      </PageHeader>
      <Route
        exact
        path="/settings"
        render={props => (
          <PersonalSettings {...props} key="component" currentUser={settingProps.currentUser} />
        )}
      />
      <Route
        path="/settings/company"
        render={props => <CompanySettings {...props} key="component" currentUser={settingProps.currentUser} />}
      />
    </div>
  );
};

export default Settings;
