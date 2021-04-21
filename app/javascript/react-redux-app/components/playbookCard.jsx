import React from 'react';
import { Link, NavLink } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faCog } from '@fortawesome/free-solid-svg-icons'

const PlaybookCard = (props) => {
  return (
    <div className="card playbook">
      <div className="title stretch">
        <p className="large bold">{props.playbook.name}</p>
        <div className="edit-actions">
          <FontAwesomeIcon icon={faPencilAlt} />
          <FontAwesomeIcon icon={faCog} />
        </div>
      </div>
      <div className="content">
        {props.playbook.description}
      </div>
      <div className="card-actions stretch">
        <br/>
        <button className="secondary medium" onClick={props.onClick}>Start Call</button>
      </div>
    </div>
  );
};

export default PlaybookCard;
