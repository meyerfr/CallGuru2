import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const PageHeading = (props) => {
  return (
    <div className="page-header">
      <h5>{props.page}</h5>
      {props.children}
    </div>
  );
};

export default PageHeading;
