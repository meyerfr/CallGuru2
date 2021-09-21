import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const PageHeader = (props) => {
  return (
    <div className="page-header">
      {
        props.onChange ?
          <input type="text" value={props.page ? props.page : ''} onChange={props.onChange}/>
        :
          <h5>{props.page}</h5>
      }
      {props.children}
    </div>
  );
};

export default PageHeader;
