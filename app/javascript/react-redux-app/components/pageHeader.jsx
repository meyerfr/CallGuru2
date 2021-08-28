import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const PageHeader = (props) => {
  return (
    <div className="page-header">
      <h5>{props.page}</h5>
      {props.children}
    </div>
  );
};

export default PageHeader;
