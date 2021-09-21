import React, { Component } from 'react'

import { usePopper } from 'react-popper';


const ContentTypePopup = (props) => {
  const {
    contentTypes,
    onOpenChange,
    onSelect,
    onFocus,
    open,
    focusedContentType
  } = props


  return(
    <div className={`contentType-popup${open ? ' open' : ''}`}>
      {
        contentTypes.map((contentType) => {
          return(
            <div key={contentType.name} ref={contentType.ref} className={`contentType-list-item${focusedContentType.name === contentType.name ? ' focused' : ''}`} onMouseOver={() => onFocus(contentType)} onClick={() => onSelect(contentType.database_name)}>
              <img src={contentType.img} alt={`${contentType.name}-img`} />
              <div className="content">
                <span className="header small">{contentType.name}</span>
                <span className="description extra-small">{contentType.description}</span>
              </div>
            </div>
          )

        })
      }
    </div>
  )
}

export default ContentTypePopup;
