import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import CreateCompanyModal from '../containers/createCompanyModal'


class BackOffice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCreateModal: false
    }
  }

  toggleCreateCompanyModal = () => {
    this.setState({
      showCreateModal: !this.state.showCreateModal
    })
  }

  render(){
    const { companies } = this.props
    return[
      <div className="page-content-wrapper row-2 a-fr" key="PageContentWrapper">
        <span>List of all Companies registered at CallGuru</span>
        <div className="page-content-container">
          <table className="card no-hover list">
            <thead>
              <tr>
                <th>Company</th>
                <th>Website</th>
                <th>Branch</th>
                <th>Description</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {
                companies &&
                companies.map((company, index) => {
                  return(
                    <tr key={company.id}>
                      <td className="d-flex">
                        {company.logo && <img src={company.logo} className="avatar small" alt="Logo" />}
                        {company.name}
                        <NavLink activeClassName="active" className="tab" exact to={`/backoffice/companies/${company.id}`}>
                          <button className="open extra-small center"><i className="fas fa-expand-alt"></i>Open</button>
                        </NavLink>
                      </td>
                      <td><a href={`https://${company.website}`} target="_blank">{company.website}</a></td>
                      <td>{company.branch}</td>
                      <td>{company.description}</td>
                      <td>{company.users.length}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <button className="bottom-right-corner secondary center avatar" onClick={this.toggleCreateCompanyModal}><i className="fas fa-plus"></i></button>
      </div>,
      <CreateCompanyModal key='Modal' show={this.state.showCreateModal} onHide={this.toggleCreateCompanyModal} chooseCompany={(company_id) => this.props.history.push(`/backoffice/companies/${company_id}`)} />
    ]
  }
}

export default BackOffice
