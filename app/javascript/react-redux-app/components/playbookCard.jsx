import React from 'react';
import { Link, NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faClock } from '@fortawesome/free-solid-svg-icons'

import Illustration from '../../../assets/images/illustration.svg'

const PlaybookCard = (props) => {
  const {playbook, currentUser, onClick} = props
  return (
    <div className="card playbook pointer" onClick={onClick}>
      <img
        src={Illustration}
        alt="Playbook Illustration"
      />
      <div className="content">
        <p className="medium bold">{playbook.name}</p>
        <span className="description extra-small">
          {playbook.description}
        </span>
        <div className="card-actions">
          {
            currentUser.current_sign_in_at < playbook.created_at ?
              <label className="extra-small secondary-light2">
                New
              </label>
            :
              currentUser.current_sign_in_at < playbook.updated_at &&
                <label className="extra-small secondary-light2">
                  Update
                </label>
          }
          {
            playbook.duration &&
            <label className="extra-small duration">
              <i className="far fa-clock"></i>
              {playbook.duration} minutes
            </label>
          }
          {
            playbook.tags.slice(0, 5).map((tag) => {
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
  );
};

export default PlaybookCard;
