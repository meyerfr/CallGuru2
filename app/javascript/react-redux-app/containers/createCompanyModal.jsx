import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/Modal'

import { createCompany } from '../actions'

class CreateCompanyModal extends Component {
  onSubmit = (values) => {
    this.props.createCompany(values).then(() => {
      // this.props.resetForm()
      this.props.onHide()
    })
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        // backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <div className="finish-apply-modal" style={{padding: '1rem 1rem 2rem'}}>
          <div className="finish-apply-modal-head">
            <h2>Create Company</h2>
          </div>
          <div className="finish-apply-modal-body">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="form-group">
                <label htmlFor="InputName">Name</label>
                <Field name="name" type="text" placeholder="CallGuru" component="input" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="InputDescription">Description</label>
                <Field name="description" type="text" placeholder="Please describe this company" component="input" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="InputBranch">Branch</label>
                <Field name="branch" type="text" placeholder="sales enablement" component="input" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="InputWebsite">Website</label>
                <Field name="website" type="text" placeholder="www.callguru.de" component="input" className="form-control" />
              </div>
              <button className="primary" type="submit">Add company</button>
            </form>
          </div>
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
