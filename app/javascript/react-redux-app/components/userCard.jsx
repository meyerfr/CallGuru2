import React from 'react';
import { Link, NavLink } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const UserCard = (props) => {
  const user = props.user
  return (
    <div className="card user" >
      <div className="title stretch">
        <p className="large bold">{user.first_name} {user.last_name}</p>
        <div className="edit-actions">
          <FontAwesomeIcon icon={faLink} />
        </div>
      </div>
      <div className="content d-flex flex-column">
        <span className="medium">{user.email}</span>
        <span className="medium">{user.job_title}</span>
        <span className="medium">{user.role}</span>
      </div>
      {
        // <div className="card-actions stretch">
        //   <br/>
        //   <button className="secondary medium">View User</button>
        // </div>
      }
    </div>
  );
};

export default UserCard;
