import React from 'react';

const Paragraph = ({ block, selected, classPrefix, editable }) => {
  const contentType = block.content_type

  if (selected !== null && selected !== undefined) {
    return(
      <div className="d-flex block">
        <input type="radio" id={block.id} value={block.text} checked={selected} onChange={() => onClick({...block, ref: myRef}, updatedElement)} />
        <label className="label" htmlFor={block.id}>{block.text}</label>
      </div>
    )
  } else{
    let ElementTag = ""
    switch(contentType.style){
      case 'header':
        ElementTag = 'h1'
      case 'subheader':
        ElementTag = 'h2'
      case 'paragraph':
        ElementTag = 'p'
    }
    return <ElementTag className={`block ${classPrefix ? classPrefix : ''}`}>{block.text}</ElementTag>
  }
};


export default Paragraph;

