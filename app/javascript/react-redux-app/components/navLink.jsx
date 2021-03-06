import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'


const OverlayNavLink = (props) => {
  return(
    <OverlayTrigger
      placement={props.position}
      overlay={
        <Tooltip id={`tooltip-left`} className="callguru-tooltip">
          {props.tooltip_text}
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
};

export default OverlayNavLink;
