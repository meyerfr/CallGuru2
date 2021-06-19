import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { faSearch, faFilter, faPencilAlt, faCog, faLink } from '@fortawesome/free-solid-svg-icons'

import { fetchCompanies } from '../actions'

import PageHeader from '../components/pageHeader'
import UserCard from '../components/userCard'
import AddEmployeeModal from './addEmployeeModal'

class CompanyShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAddEmployeeModal: false
    }
  }

  componentDidMount() {
    if (this.props.company == undefined) {
      this.props.fetchCompanies()
    }
  }

  toggleAddEmployeeModal = () => {
    this.setState({
      showAddEmployeeModal: !this.state.showAddEmployeeModal
    })
  }


  render() {
    const company = this.props.company
    const users = company?.users
    const website_url = company?.website.includes('http') ? company?.website : `//${company?.website}`
    return [
      <div className="page-content-wrapper row-2 a-fr" key="PageContentWrapper">
        <div className="page-content-container">
          <table className="card no-hover list col3">
            <tbody>
              <tr>
                <th>Invite</th>
                <th>Name</th>
                <th>Email</th>
                <th>role</th>
              </tr>
              {
                users &&
                users.map((user, index) => {
                  return(
                    <tr key={user.id}>
                      <td>
                        {
                          user.invitation_accepted !== undefined &&
                          user.invitation_accepted ?
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-left" className="callguru-tooltip">
                                  {`accepted at ${user.invitation_accepted_at}`}
                                </Tooltip>
                              }
                            >
                              <i className="far fa-envelope-open"></i>
                            </OverlayTrigger>
                          :
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip id="tooltip-left" className="callguru-tooltip">
                                  {`invite sent at ${user.invitation_sent_at}`}
                                </Tooltip>
                              }
                            >
                              <i className="far fa-envelope"></i>
                            </OverlayTrigger>
                        }
                      </td>
                      <td className="d-flex">
                        {user.avatar && <img src={user.avatar} className="avatar small" alt="Logo" />}
                        {user.first_name} {user.last_name}
                        <NavLink activeClassName="active" className="tab" exact to={`/backoffice/companies/users/${user.id}`}>
                          <button className="open extra-small center"><i className="fas fa-expand-alt"></i>Open</button>
                        </NavLink>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <button className="bottom-right-corner secondary center avatar" onClick={this.toggleAddEmployeeModal}><i className="fas fa-plus"></i></button>
      </div>,
      <AddEmployeeModal key='Modal' show={this.state.showAddEmployeeModal} onHide={this.toggleAddEmployeeModal} company={this.props.company} currentUser={this.props.currentUser} />
    ];
  }
};

function mapStateToProps(state, ownProps) {
  const companyId = ownProps.match.params.id;
  return {
    company: state.companies.find((company) => company.id === companyId),
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCompanies }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyShow);
