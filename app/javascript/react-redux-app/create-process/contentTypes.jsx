export const ContentTypes = {
  HEADER: {
    "form_input": false,
    "group": "text",
    "style": "paragraph",
    "complex": false,
    "created_at": "2021-05-25T14:48:48.333Z",
    "updated_at": "2021-05-25T14:48:48.333Z"
  }
}

export const ContentGroups = {
  TEXT: 'text',
  LIST: 'list',
  IMG: 'img',
  INPUT: 'input',
  SELECT: 'select',
  MULTISELECT: 'multiselect'
}

export const ContentTypes = {
  HEADER:
}

- fetchContentTypes
- ContentTypesReducer
    - iterate over content types and create Types that can be created also templates like yes, no select

export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


newContentBlock = (group, style, contentTypes, contentableId, contentableType = 'Outline') => {
  contentType = contentTypes.find((contentType) => contentType.group == group &&& contentType.style === style)
  let contentBlock
  switch (group){
    case 'text':
    case 'img':
    case 'input':
      contentBlock = {
        id: null,
        contentable_type: contentableType,
        contentable_id: contentableId,
        content_type_id: contentType.id,
        content_type: contentType,
        text: '',
        order_no: null,
        react_id: uuid(),
        _destroy: '1'
      }
      break;
    case 'list':
    case 'select':
    case 'multiselect':
      contentBlock = {
        id: null,
        contentable_type: contentableType,
        contentable_id: contentableId,
        content_type_id: contentType.id,
        content_type: contentType,
        text: '',
        order_no: null,
        react_id: uuid(),
        _destroy: '1',
        content_options_attributes: [
          {
            id: null,
            name: '',
            react_id: uuid(),
            _destroy: '1'
          }
        ]
      }
      switch(style) {
        case 'yes_no':
          contentBlock.content_options_attributes = [
            {
              id: null,
              name: 'Yes',
              react_id: uuid(),
              _destroy: '0'
            },
            {
              id: null,
              name: 'No',
              react_id: uuid(),
              _destroy: '0'
            }
          ]
      }
      break;
  }
}
