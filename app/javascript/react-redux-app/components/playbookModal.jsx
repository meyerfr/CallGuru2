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
        <div className="left-body">
          <span className="large bold">{props.playbook?.name}</span>
          <span className="description medium light5">
            {props.playbook?.description}
          </span>
          <button className="stretch secondary" onClick={() => startCall(props.playbook?.id, props.createCall, props.history)}>Start call</button>
        </div>
        <div className="right-body">
      {/*    <div className="actions">
            <FontAwesomeIcon icon={faFilter} />
          </div>*/}
          <div className="list">
            <div className="list-item">
              <span className="small bold">Duration</span>
              <span className="small light5">{props.playbook?.duration} minutes</span>
            </div>
            <div className="list-item">
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
            <div className="list-item">
              <span className="small bold">Last change</span>
              <span className="small light5">{moment(props.playbook?.updated_at).format('Do MMMM')}</span>
            </div>
            <div className="list-item">
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
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PlaybookModal
