import React from 'react';
import { Link, NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faClock } from '@fortawesome/free-solid-svg-icons'

import Illustration from '../../../assets/images/illustration.svg'

const PlaybookCard = (props) => {
  return (
    <div className="card playbook pointer" onClick={props.onClick}>
      <img
        src={Illustration}
        alt="Playbook Illustration"
      />
      <div className="content">
        <p className="medium bold">{props.playbook.name}</p>
        <span className="description extra-small">
          {props.playbook.description}
        </span>
        <div className="card-actions">
          {
            props.playbook.duration &&
            <label className="extra-small duration">
              <i className="far fa-clock"></i>
              {props.playbook.duration} minutes
            </label>
          }
          {
            props.playbook.tags.slice(0, 5).map((tag) => {
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
