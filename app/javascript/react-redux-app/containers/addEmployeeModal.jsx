import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/Modal'

import { addEmployee } from '../actions'

class AddEmployeeModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      sendAutomaticMail: true
    }
  }

  copyAcceptInvitationLink = (accept_user_invitation_url) => {
    const el = document.createElement('textarea');
    el.value = accept_user_invitation_url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  onSubmit = (values) => {
    this.props.addEmployee(this.props.company.id, values, this.state.sendAutomaticMail).then((r) => {
      this.copyAcceptInvitationLink(r.payload.accept_user_invitation_url)
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
            <h2>Add Employee</h2>
          </div>
          <div className="finish-apply-modal-body">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="d-flex">
                <div className="form-group">
                  <label htmlFor="InputFirstName">First Name</label>
                  <Field name="first_name" type="text" placeholder="Max" component="input" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="InputLastName">Last Name</label>
                  <Field name="last_name" type="text" placeholder="Mustermann" component="input" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="InputEmail">Email</label>
                <Field name="email" type="text" placeholder="fritz.meyer@callguru.de" component="input" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="InputRole">User Role:</label>
                <Field name="role" component="select" className="form-control" selected="Agent">
                  <option value="Agent">Agent</option>
                  <option value="Account Manager">Account Manager</option>
                  <option value="Team Manager">Team Manager</option>
                  {
                    this.props.company?.name === 'CallGuru' && this.props.currentUser.role === 'CallGuru Admin' &&
                    <option value="CallGuru Admin">CallGuru Admin</option>
                  }
                </Field>
              </div>
              <div className="d-inline">
                <input type="checkbox" id="sendAutomaticMail" value="sendAutomaticMail" checked={this.state.sendAutomaticMail} onChange={() => this.setState({sendAutomaticMail: !this.state.sendAutomaticMail})} />
                <label className="label" htmlFor="sendAutomaticMail">send Automatic Mail</label>
              </div>
              <button className="primary" type="submit">Add employee</button>
            </form>
          </div>
        </div>
      </Modal>
    )
  }
};

export default reduxForm({
  form: 'addEmployeeModal' // a unique identifier
})(
  connect(null, { addEmployee })(AddEmployeeModal)
);
