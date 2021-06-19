import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/Modal'

import { createCompany } from '../actions'

class CreateCompanyModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      company: {
        name: '',
        website: '',
        branch: '',
        description: ''
      }
    }
  }

  onSubmit = () => {
    this.props.createCompany(this.state.company).then((r) => {
      // this.props.resetForm()
      this.props.chooseCompany(r.payload.id)
    })
  }

  onCompanyChange = (event) => {
    this.setState({
      company: {
        ...this.state.company,
        [event.target.name]: event.target.value
      }
    })
  }

  onUserChange = (user_index) => {
    const usersAttributes = this.state.company.users_attributes
    usersAttributes[user_index] = {...usersAttributes[user_index], [event.target.name]: event.target.value}
    this.setState({
      company: {
        ...this.state.company,
        users_attributes: usersAttributes
      }
    })
  }

  render() {
    const { company } = this.state
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        // backdrop="static"
        size="lg"
        className="create-modal playbook"
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <div className="finish-apply-modal" style={{padding: '1rem 1rem 2rem'}}>
          <div className="finish-apply-modal-head">
            <h3>Create Company</h3>
          </div>
          <div className="finish-apply-modal-body">
            <div className="card-heading">
              <span className="extra-small">Please add all the Company information.</span>
            </div>
            <div className="inline">
              <div className="move-placeholder-wrapper">
                <input type="text" name="name" value={company.name} placeholder=" " className="move-placeholder-input" onChange={this.onCompanyChange} />
                <label className="move-placeholder-placeholder">Company name</label>
              </div>

              <div className="move-placeholder-wrapper">
                <input type="text" name="branch" value={company.branch} placeholder=" " className="move-placeholder-input" onChange={this.onCompanyChange} />
                <label className="move-placeholder-placeholder">Branch</label>
              </div>
            </div>

            <div className="move-placeholder-wrapper">
              <input type="text" name="website" value={company.website} placeholder=" " className="move-placeholder-input" onChange={this.onCompanyChange} />
              <label className="move-placeholder-placeholder">Website</label>
            </div>

            <div className="move-placeholder-wrapper textarea">
              <textarea name="description" className="move-placeholder-input" cols="40" rows="5" value={company.description} placeholder=" " onChange={this.onCompanyChange} />
              <label className="move-placeholder-placeholder">Description</label>
            </div>
          </div>
          <button onClick={this.onSubmit} className="secondary stretch">Create Company</button>
        </div>
      </Modal>
    )
  }
};

export default reduxForm({
  form: 'newCompanyForm' // a unique identifier
})(
  connect(null, { createCompany })(CreateCompanyModal)
);
