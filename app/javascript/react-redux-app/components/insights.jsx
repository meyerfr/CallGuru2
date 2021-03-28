import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import PageHeader from './pageHeader'

const Insights = (props) => {
  return (
    <div className="app-wrapper">
      <PageHeader key="PageHeader" page="Insights">
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
      <div>
        Hello Insights
      </div>
    </div>
  );
};

export default Insights;
