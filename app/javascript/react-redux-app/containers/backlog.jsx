import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter, faPencilAlt, faCog } from '@fortawesome/free-solid-svg-icons'

import PageHeader from '../components/pageHeader'
import CompanyCard from '../components/companyCard'
import CreateCompanyModal from './createCompanyModal'

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
    this.props.history.push(`/companies/${company_id}`);
  }

  toggleCreateCompanyModal = () => {
    this.setState({
      showCreateModal: !this.state.showCreateModal
    })
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
            <div className="actions">
              <button>LogOut</button>
            </div>
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
              <div className="card center bg-secondary action" onClick={this.toggleCreateCompanyModal}>
                <h5 className="bold">Create</h5>
                <h5 className="bold">Company</h5>
              </div>
              {
                companies &&
                companies.map((company, index) => <CompanyCard key={index} company={company} chooseCompany={this.chooseCompany} />)
              }
            </div>
          </div>
        </div>
      </div>,
      <CreateCompanyModal key='Modal' show={this.state.showCreateModal} onHide={this.toggleCreateCompanyModal} />
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
