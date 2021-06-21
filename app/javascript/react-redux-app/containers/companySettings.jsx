import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'

import { Link, NavLink } from 'react-router-dom'

import { updateCompany, uploadLogo } from '../actions'

class CompanySettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      company: props.currentUser.company,
      saveButton: {
        text: 'Save',
        disabled: true
      },
      logoPreview: props.currentUser.company.logo ? props.currentUser.company.logo : null
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.company.name !== this.state.company.name || prevState.company.branch !== this.state.company.branch || prevState.company.website !== this.state.company.website || prevState.company.description !== this.state.company.description) {
      const { name, branch, website, description, logo } = this.state.company
      if (this.props.currentUser.company.name !== name || this.props.currentUser.company.branch !== branch || this.props.currentUser.company.website !== website || this.props.currentUser.company.description !== description) {
        if ([name, branch, website, description].every(field => field !== '')) {
          this.setState({
            saveButton: {
              text: 'Save',
              disabled: false
            }
          })
        }
      } else if(!this.state.saveButton.disabled){
        this.setState({
          saveButton: {
            ...this.state.saveButton,
            disabled: true
          }
        })
      }
    }
  }

  handlePasswordButton = (password, confirmPassword) => {
    if (password !== '' && confirmPassword !== '' && this.state.passwordButton.disabled) {
      this.setState({
        ...this.state,
        passwordButton: {
          text: 'Change password',
          disabled: false
        }
      })
    } else if (!this.state.passwordButton.disabled){
      this.setState({
        ...this.state,
        passwordButton: {
          ...this.state.passwordButton,
          disabled: true
        }
      })
    }
  }

  onSave = () => {
    this.props.updateCompany(this.state.company, () => {
      this.setState({
        ...this.state,
        saveButton: {
          text: 'changed',
          disabled: true
        }
      })
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

  onImageChange = (event) => {
    this.setState({
      company: {
        ...this.state.company,
        logo: event.target.files[0]
      },
      logoPreview: URL.createObjectURL(event.target.files[0])
    }, () => {
      this.props.uploadLogo(this.state.company)
    })
  }

  render(){
    const { company, logoPreview } = this.state
    return (
      <div className="page-content-wrapper columns-2 _65_a">
        <div className="page-content-container">
          <div className="card no-hover">
            <div className="card-heading">
              <p className="medium bold">Company information</p>
              <span className="extra-small">Here you can change all your important personal information.</span>
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

            <button className="secondary" onClick={this.onSave} disabled={this.state.saveButton.disabled}>{this.state.saveButton.text}</button>
          </div>
        </div>
        <div className="card no-hover avatar">
          <div className="card-heading">
            <p className="medium bold">Logo</p>
          </div>
          <div className="avatar-wrapper">
            <label className="label center pointer" htmlFor="upload-button">
              {
                logoPreview ?
                  <img src={logoPreview}  alt="Logo" />
                :
                  <div className="avatar-placeholder">
                    {company.name.charAt(0)}
                  </div>
              }
              <div className="position-upload-icon center button-style secondary">
                <FontAwesomeIcon icon={faImage} className="icon" />
              </div>
            </label>
            <input type="file" accept="image/*" id="upload-button" name="logo" multiple={false} style={{display: 'none'}} onChange={this.onImageChange} />
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateCompany, uploadLogo }, dispatch);
}

export default connect(null, mapDispatchToProps)(CompanySettings);
