import React from 'react';

const Paragraph = ({ block, selected, classPrefix, editable, updatedElement, myRef, onClick }) => {
  const contentType = block.content_type

  if (selected !== null && selected !== undefined) {
    return(
      <div className="d-flex block pointer">
        <input type={classPrefix.includes('multiselect') ? 'checkbox' : 'radio'} className="pointer" id={block.id} value={block.text} checked={selected} onChange={() => onClick({...block, ref: myRef}, updatedElement)} />
        <label className="label pointer" htmlFor={block.id}>{block.text}</label>
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
    return <ElementTag className={`block${classPrefix ? ` ${classPrefix}` : ''}`}>{block.text}</ElementTag>
  }
};


export default Paragraph;

