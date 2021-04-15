import React from 'react';
import { Link, NavLink } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const CompanyCard = (props) => {
  const company = props.company
  const website_url = company.website.includes('http') ? company.website : `//${company.website}`
  return (
    <div className="card company" >
      <div className="title stretch">
        <p className="large bold">{company.name}</p>
        <div className="edit-actions">
          <Link to={website_url} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLink} />
          </Link>
        </div>
      </div>
      {
        company.branch &&
        <span className="medium">{company.branch}</span>
      }
      <div className="content">
        {company.description}
      </div>
      <div className="card-actions stretch">
        <br/>
        <button className="secondary medium" onClick={() => props.chooseCompany(company.id)}>View Company</button>
      </div>
    </div>
  );
};

export default CompanyCard;
