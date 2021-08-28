import React from 'react'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import Illustration from '../../../assets/images/illustration.svg'

import { startCall } from '../helper-methods/callMethods'

const PlaybookModal = (props) => {
  return (
    <Modal
      show={props.show}
      size="lg"
      onHide={props.onClick}
      aria-labelledby="contained-modal-title-vcenter"
      className="playbook"
      centered
    >
      <Modal.Header closeButton>
        <img
          src={Illustration}
          alt="Playbook Illustration"
        />
      </Modal.Header>
      <Modal.Body>
        <div className="PlaybookName">
          <span className="large bold">
            {props.playbook?.name}
          </span>
        </div>
        <div className="Actions">
          <i className="fas fa-cog" onClick={() => props.updatePlaybook(props.playbook?.id)}></i>
          <i className="far fa-star"></i>
        </div>
        <div className="Information">
          <div>
            <span className="small bold">Duration</span>
            <span className="small light5">{props.playbook?.duration} minutes</span>
          </div>
          <div>
            <span className="small bold">Created by</span>
            {
              props.playbook?.owner.avatar ?
                <div className="inline-grid">
                  <img src={props.playbook?.owner.avatar} className="avatar small" alt="Avatar" />
                  <span className="small light5">{props.playbook?.owner.first_name}</span>
                </div>
              :
                <span className="small light5">{props.playbook?.owner.first_name}</span>
            }
          </div>
          <div>
            <span className="small bold">Last change</span>
            <span className="small light5">{moment(props.playbook?.updated_at).format('Do MMMM')}</span>
          </div>
          <div>
            <span className="small bold">Tags</span>
            <div className="d-flex f-wrap card-actions">
              {
                props.playbook?.duration &&
                <label className="extra-small duration">
                  <i className="far fa-clock"></i>
                  {props.playbook?.duration} minutes
                </label>
              }
              {
                props.playbook?.tags.map((tag) => {
                  return(
                    <label key={tag.name} className="primary-light2 extra-small">
                      {tag.name}
                    </label>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="Description">
          <span className="medium light5">{props.playbook?.description}</span>
          <button className="Button stretch secondary" onClick={() => props.startCall(props.playbook?.id)}>Start call</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PlaybookModal
