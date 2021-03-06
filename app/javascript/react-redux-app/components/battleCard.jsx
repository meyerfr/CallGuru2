import React from 'react';
import { Link, NavLink } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faToggleOn } from '@fortawesome/free-solid-svg-icons'

const BattleCard = (props) => {
  return (
    <div className="card battle">
      <div className="head">
        <div className="keyword-list">
          {
            props.battle_card.keywords.map((keyword, index) => (
              <span className="item small" key={index}>{keyword}</span>
            ))
          }
        </div>
        <div className="edit-actions fixed">
          <FontAwesomeIcon icon={faPencilAlt} />
          <FontAwesomeIcon icon={faToggleOn} />
        </div>
      </div>
      <span className="extra-large bold title">{props.battle_card.title}</span>
    </div>
  );
};

export default BattleCard;
