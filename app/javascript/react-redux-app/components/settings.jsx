import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import PageHeader from './pageHeader'

const Settings = (props) => {
  return (
    <div className="app-wrapper">
      <PageHeader key="PageHeader" page="Settings">
        {
          // <div className="tabs">
          //   <NavLink activeClassName="active" className="tab" to={`/playbooks`}>
          //     <span className="normal bold">Tab 1</span>
          //   </NavLink>
          //   <NavLink activeClassName="active" className="tab" to={`/playbooks?tab2`}>
          //     <span className="normal bold">Tab 2</span>
          //   </NavLink>
          //   <NavLink activeClassName="active" className="tab" to={`/playbooks?tab3`}>
          //     <span className="normal bold">Tab 3</span>
          //   </NavLink>
          // </div>
          // <div className="actions">
          //   <button>Action</button>
          // </div>
        }
      </PageHeader>
      <div className="page-content-wrapper row-2 fr-a medium">
        <div className="page-content-container">
          <div className="list">
            <span className="extra-large bold">Company Name</span>
            <div className="seperater"></div>
            <div className="content-item">
              <span className="large bold">Company Info</span>
              <span className="normal bold">Company Branche</span>
              <span className="normal bold">www.company.de</span>
              <span className="normal bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque.</span>
            </div>
            <div className="seperater"></div>
            <div className="content-item">
              <span className="large bold">Company Info</span>
              <span className="normal bold">Company Branche</span>
              <span className="normal bold">www.company.de</span>
              <span className="normal bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque.</span>
            </div>
            <div className="seperater"></div>
            <div className="content-item">
              <span className="large bold">Company Info</span>
              <span className="normal bold">Company Branche</span>
              <span className="normal bold">www.company.de</span>
              <span className="normal bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque.</span>
            </div>
          </div>
        </div>
        <div className="page-content-actions-wrapper">
          <div className="seperater"></div>
          <div className="page-content-actions-container">
            <button className="primary normal bold">Save</button>
            <button className="primary normal bold outline">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
