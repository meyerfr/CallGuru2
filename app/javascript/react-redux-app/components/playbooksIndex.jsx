import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'

import PageHeader from './pageHeader'
import PlaybookCard from './playbookCard'

import playbooks from '../db/playbooks'

const PlaybooksIndex = (props) => {
  return (
    <div className="app-wrapper">
      <PageHeader key="PageHeader" page="Playbooks">
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
      <div className="page-content-wrapper row-2 a-fr">
        <div className="stretch">
          <span className="large">This is a list of all your Playbooks. Just click on “start Call” and get going. Otherwise you can also filter or query your Playbooks</span>
          <div className="filters">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faFilter} />
          </div>
        </div>
        <div className="page-content-container">
          <div className="wrapped-list">
            <div className="card center bg-secondary action">
              <h5 className="bold">Create</h5>
              <h5 className="bold">Playbook</h5>
            </div>
            {
              playbooks &&
              playbooks.map((playbook, index) => <PlaybookCard key={index} playbook={playbook} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybooksIndex;