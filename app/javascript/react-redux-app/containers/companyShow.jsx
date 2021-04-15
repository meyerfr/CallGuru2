import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter, faPencilAlt, faCog, faLink } from '@fortawesome/free-solid-svg-icons'

import { fetchCompanies } from '../actions'

import PageHeader from '../components/pageHeader'
import UserCard from '../components/userCard'

class CompanyShow extends Component {
  componentDidMount() {
    if (this.props.company == undefined) {
      this.props.fetchCompanies()
    }
  }

  render() {
    const company = this.props.company
    const users = company?.users
    const website_url = company?.website.includes('http') ? company?.website : `//${company?.website}`
    return (
      <div className="app-wrapper">
        <PageHeader key="PageHeader" page={company?.name}>
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
            <div className="actions">
              <button>LogOut</button>
            </div>
          }
        </PageHeader>
        <div className="page-content-wrapper row-2 fr-a medium">
          <div className="page-content-container">
            <div className="list">
              <div className="content-item">
                <span className="large bold">Company Info</span>
                <span className="medium">{company?.branch}</span>
                {
                  website_url &&
                  <Link to={website_url} target="_blank" rel="noopener noreferrer" className="medium">{company?.website}</Link>
                }
                <span className="medium">{company?.description}</span>
              </div>
              <div className="seperater"></div>
              <div className="wrapped-list">
                <div className="card center bg-secondary action" onClick={this.toggleCreateCompanyModal}>
                  <h5 className="bold">Add</h5>
                  <h5 className="bold">Employee</h5>
                </div>
                {
                  users?.length > 0 &&
                  company.users.map((user, index) => <UserCard key={user.id} user={user} />)
                }
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
  }
};

function mapStateToProps(state, ownProps) {
  const companyId = ownProps.match.params.id;
  return {
    company: state.companies.find((company) => company.id === companyId)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCompanies }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyShow);
