import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'

import { Link, NavLink } from 'react-router-dom'

import { updateUser, uploadAvatar } from '../actions'

class PersonalSettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: props.currentUser,
      password: '',
      confirmPassword: '',
      saveButton: {
        text: 'Save',
        disabled: true
      },
      passwordButton: {
        text: 'Change password',
        disabled: true
      },
      avatarPreview: props.currentUser.avatar ? props.currentUser.avatar : null
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.password !== this.state.password || prevState.confirmPassword !== this.state.confirmPassword) {
      this.handlePasswordButton(this.state.password, this.state.confirmPassword)
    }
    if (prevState.currentUser.first_name !== this.state.currentUser.first_name || prevState.currentUser.last_name !== this.state.currentUser.last_name || prevState.currentUser.email !== this.state.currentUser.email) {
      const { first_name, last_name, email } = this.state.currentUser
      if (this.props.currentUser.first_name !== first_name || this.props.currentUser.last_name !== last_name || this.props.currentUser.email !== email) {
        if ([first_name, last_name, email].every(field => field !== '')) {
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
    this.props.updateUser(this.state.currentUser, () => {
      this.setState({
        ...this.state,
        saveButton: {
          text: 'update successful',
          disabled: true
        }
      })
    })
  }

  onUserChange = (event) => {
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        [event.target.name]: event.target.value
      }
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  onImageChange = (event) => {
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        avatar: event.target.files[0]
      },
      avatarPreview: URL.createObjectURL(event.target.files[0])
    }, () => {
      this.props.uploadAvatar(this.state.currentUser)
    })
  }

  render(){
    const { currentUser, password, confirmPassword, avatarPreview } = this.state
    return (
      <div className="page-content-wrapper columns-2 _65_a">
        <div className="page-content-container">
          <div className="card no-hover">
            <div className="card-heading">
              <p className="medium bold">Personal information</p>
              <span className="extra-small">Here you can change all your important personal information.</span>
            </div>
            <div className="inline">
              <div className="move-placeholder-wrapper">
                <input type="text" name="first_name" value={currentUser.first_name} placeholder=" " className="move-placeholder-input" onChange={this.onUserChange} />
                <label className="move-placeholder-placeholder">First Name</label>
              </div>

              <div className="move-placeholder-wrapper">
                <input type="text" name="last_name" value={currentUser.last_name} placeholder=" " className="move-placeholder-input" onChange={this.onUserChange} />
                <label className="move-placeholder-placeholder">Last Name</label>
              </div>
            </div>

            <div className="move-placeholder-wrapper">
              <input type="text" name="email" value={currentUser.email} placeholder=" " className="move-placeholder-input" onChange={this.onUserChange} />
              <label className="move-placeholder-placeholder">Email</label>
            </div>

            <div className="move-placeholder-wrapper disabled">
              <input type="text" name="company_name" disabled value={currentUser.company.name} placeholder=" " className="move-placeholder-input" onChange={() => {}}/>
              <label className="move-placeholder-placeholder">Company</label>
            </div>

            <button className="secondary" onClick={this.onSave} disabled={this.state.saveButton.disabled}>{this.state.saveButton.text}</button>
          </div>
          <div className="card no-hover">
            <div className="card-heading">
              <p className="medium bold">Change password</p>
              <span className="extra-small">Here you can change your password.</span>
            </div>
            <div className="inline">
              <div className="move-placeholder-wrapper">
                <input type="password" name="password" value={password} placeholder=" " className="move-placeholder-input" onChange={this.onPasswordChange} />
                <label className="move-placeholder-placeholder">New password</label>
              </div>
              <div className="move-placeholder-wrapper">
                <input type="password" name="confirmPassword" value={confirmPassword} placeholder=" " className="move-placeholder-input" onChange={this.onPasswordChange} />
                <label className="move-placeholder-placeholder">Confirm new password</label>
              </div>
            </div>
            <button className="secondary" disabled={this.state.passwordButton.disabled}>Change Password</button>
          </div>
        </div>
        <div className="card no-hover avatar">
          <div className="card-heading">
            <p className="medium bold">Avatar</p>
          </div>
          <div className="avatar-wrapper">
            <label className="label center pointer" htmlFor="upload-button">
              {
                avatarPreview ?
                  <img src={avatarPreview}  alt="Avatar" />
                :
                  <div className="avatar-placeholder">
                    {currentUser.first_name.charAt(0)}{currentUser.last_name.charAt(0)}
                  </div>
              }
              <div className="position-upload-icon center button-style secondary">
                <FontAwesomeIcon icon={faImage} className="icon" />
              </div>
            </label>
            <input type="file" accept="image/*" id="upload-button" name="avatar" multiple={false} style={{display: 'none'}} onChange={this.onImageChange} />
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
  return bindActionCreators({ updateUser, uploadAvatar }, dispatch);
}

export default connect(null, mapDispatchToProps)(PersonalSettings);
