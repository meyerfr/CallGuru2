import React from 'react';
import { Link, NavLink } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faCog } from '@fortawesome/free-solid-svg-icons'

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
          <label className="secondary-light2 extra-small">Start Call</label>
        </div>
      </div>
    </div>
  );
};

export default PlaybookCard;
