import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter, faPencilAlt, faCog } from '@fortawesome/free-solid-svg-icons'

import PageHeader from '../components/pageHeader'
import CompanyCard from '../components/companyCard'
import CreateCompanyModal from './createCompanyModal'
import BackOffice from '../components/backOffice'
import CompanyShow from './companyShow';


import { fetchCompanies } from '../actions'

class Backlog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCreateModal: false
    }
  }

  componentDidMount() {
    if (this.props.companies.length == 0) {
      this.props.fetchCompanies()
    }
  }

  chooseCompany = (company_id) => {
    this.props.history.push(`/backoffice/companies/${company_id}`);
  }

  render() {
    const companies = this.props.companies
    return [
      <div className="app-wrapper" key="AppWrapper">
        <PageHeader key="PageHeader" page="Backlog">
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
            //  <button>LogOut</button>
            // </div>
          }
        </PageHeader>
        <Route
          exact
          path="/backoffice"
          render={props => <BackOffice {...props} key="component" companies={companies} />}
        />
        <Route
          path="/backoffice/companies/:id"
          render={props => <CompanyShow {...props} key="component" />}
        />
      </div>
    ];
  }
};


function mapStateToProps(state) {
  return {
    companies: state.companies
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCompanies }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Backlog);
