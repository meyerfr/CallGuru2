import React, {Component} from 'react'
import Editor from '@draft-js-plugins/editor'
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkPlugin from '@draft-js-plugins/anchor';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton } from '@draft-js-plugins/buttons';


// import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import {EditorState, ContentState, RichUtils, getDefaultKeyBinding, getLastChangeType, KeyBindingUtil, convertToRaw, convertFromRaw} from 'draft-js';

import ContentTypePopup from './contentTypePopup'


const contentTypes = [
  {
    name: 'Header',
    description: 'This is Heading 1',
    img: "https://picsum.photos/200",
    database_name: 'header',
    ref: React.createRef()
  },
  {
    name: 'Subheader',
    description: 'This is Heading 2',
    img: "https://picsum.photos/200",
    database_name: 'subheader',
    ref: React.createRef()
  },
  {
    name: 'Paragraph',
    description: 'This is Paragraph',
    img: "https://picsum.photos/200",
    database_name: 'paragraph',
    ref: React.createRef()
  },
  {
    name: 'Numbered List',
    description: 'This is Numbered List',
    img: "https://picsum.photos/200",
    database_name: 'numbered',
    ref: React.createRef()
  },
  {
    name: 'Bullet List',
    description: 'This is Bullet List',
    img: "https://picsum.photos/200",
    database_name: 'bullet',
    ref: React.createRef()
  },
  {
    name: 'Toggle',
    description: 'This is Toggle',
    img: "https://picsum.photos/200",
    database_name: 'toggle',
    ref: React.createRef()
  },
  {
    name: 'Input Text',
    description: 'This is an Input Text',
    img: "https://picsum.photos/200",
    database_name: 'text',
    ref: React.createRef()
  },
  {
    name: 'Input Number',
    description: 'This is Input Number',
    img: "https://picsum.photos/200",
    database_name: 'number',
    ref: React.createRef()
  },
  {
    name: 'Input Date',
    description: 'This is an Input Date',
    img: "https://picsum.photos/200",
    database_name: 'date',
    ref: React.createRef()
  },
  {
    name: 'Input Range',
    description: 'This is an Input Range',
    img: "https://picsum.photos/200",
    database_name: 'range',
    ref: React.createRef()
  },
  {
    name: 'Input Select',
    description: 'This is an Input Select',
    img: "https://picsum.photos/200",
    database_name: 'select',
    ref: React.createRef()
  },
  {
    name: 'Input Dropdown',
    description: 'This is an Input Dropdown',
    img: "https://picsum.photos/200",
    database_name: 'dropdown',
    ref: React.createRef()
  },
  {
    name: 'Input Multiselect',
    description: 'This is an Input Multiselect',
    img: "https://picsum.photos/200",
    database_name: 'multiselect',
    ref: React.createRef()
  }
];

class Block extends Component {
  constructor(props){
    super(props);

    const inlineToolbarPlugin = createInlineToolbarPlugin()
    const linkPlugin = createLinkPlugin()

    const { InlineToolbar } = inlineToolbarPlugin
    const { LinkButton } = linkPlugin

    this.components = { InlineToolbar, LinkButton }
    this.plugins = [inlineToolbarPlugin, linkPlugin]

    this.state = {
      contentTypes: contentTypes,
      contentTypePopupOpen: false,
      focusedContentType: contentTypes[0],
      contentTypeAnchorKey: "",
      contentTypeStartKey: "",
      contentTypeSearch: "",
      prevKey: '',
      editorState: props.block.text ? EditorState.createWithContent(convertFromRaw(props.block.text)) : EditorState.createEmpty()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.block.content_type_id !== this.props.block.content_type_id) {
      this.setState({
        contentTypePopupOpen: false
      })
    }
  }

  changeEditorState = (editorState) => {
    let selectedText = this.state.selectedText
    if (this.state.contentTypePopupOpen) {
      var currentState = this.state
      var selectionState = editorState.getSelection();
      var anchorKey = selectionState.getAnchorKey();
      var currentContent = editorState.getCurrentContent();
      var currentContentBlock = currentContent.getBlockForKey(anchorKey);
      var start = this.state.contentTypeStartKey;
      selectedText = currentContentBlock.getText().slice(start + 1)
    }
    this.setState({editorState: editorState, contentTypeSearch: selectedText, contentTypes: selectedText ? defaultSuggestionsFilter(selectedText, contentTypes) : contentTypes}, () => this.props.updateParentBlock({...this.props.block, text: convertToRaw(this.state.editorState.getCurrentContent())}))
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.changeEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  prevMention = () => {
    const currentMention = this.state.focusedContentType
    const currentIndex = this.state.contentTypes.findIndex((mention) => mention.name === this.state.focusedContentType.name)
    if (currentIndex > 0) {
      this.setState({
        focusedContentType: this.state.contentTypes[currentIndex -1]
      })
    }
  }

  nextMention = () => {
    const currentMention = this.state.focusedContentType
    const currentIndex = this.state.contentTypes.findIndex((mention) => mention.name === this.state.focusedContentType.name)
    if (this.state.contentTypes[currentIndex + 1]) {
      if (this.state.contentTypes[currentIndex + 1].current) {
      }
      this.setState({
        focusedContentType: this.state.contentTypes[currentIndex + 1]
      })
    }
  }

  myKeyBindingFn = (e) => {
    switch(e.nativeEvent.keyCode){
      case 8:
        if (this.state.editorState.getSelection().getStartOffset() === 0 && this.state.editorState.getSelection().getEndOffset() === 0) {
          this.props.deleteBlock({...this.props.block, text: this.state.editorState.getCurrentContent()});
        }

        if (this.state.contentTypePopupOpen && !this.state.contentTypeSearch) {
          this.setState({
            contentTypePopupOpen: false
          })
        }

        return 'backspace'
      case 13: /* `enter` key */
        if (this.state.prevKey === 'Shift') {
          this.setState({prevKey: e.nativeEvent.key})
          return getDefaultKeyBinding(e);
        }

        this.setState({prevKey: e.nativeEvent.key})
        if (!this.state.contentTypePopupOpen) {
          this.props.addBlock(this.props.block);
        }
        return 'enter_command';
      case 27:
        if (this.state.contentTypePopupOpen) {
          this.setState({contentTypePopupOpen: false})
        }
        return 'esc'
      case 38: /* `Arrow Up` key */ /* + `Ctrl` key */
        if (this.state.contentTypePopupOpen) {
          this.prevMention()
        }else{
          this.props.focusPrevBlock()
        }
        return 'arrow_up';

      case 40: /* `Arrow Down` key */ /* + `Ctrl` key */
        if (this.state.contentTypePopupOpen) {
          this.nextMention()
        }else{
          this.props.focusNextBlock()
        }
        return 'arrow_down';
      case 55: /* `/` key */
        let newState = {
          prevKey: e.nativeEvent.key
        }
        if (this.state.prevKey === "Shift") {
          let editorBackup = this.state.editorState
          var selectionState = this.state.editorState.getSelection();
          var anchorKey = selectionState.getAnchorKey();
          var currentContent = this.state.editorState.getCurrentContent();
          var currentContentBlock = currentContent.getBlockForKey(anchorKey);
          var start = selectionState.getStartOffset();

          var selectedText = currentContentBlock.getText().slice(start-1, start);

          newState = {
            ...newState,
            editorBackup: editorBackup,
            contentTypePopupOpen: true,
            contentTypeAnchorKey: anchorKey,
            contentTypeStartKey: start
          }
        }
        this.setState({...this.state, ...newState})
        return getDefaultKeyBinding(e);
      default:
        this.setState({prevKey: e.nativeEvent.key})
        return getDefaultKeyBinding(e);
    }
  }

  handleFocus = () => {
    setTimeout(()=> {
      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState)
      })
    })
  }

  onOpenChange = (open) => {
    if (this.state.open !== open) {
      setTimeout(() => {
        this.setState({contentTypePopupOpen: open}, () => {
          if (open === false) {
            this.props.myRef.current.focus()
          }
        })
      })
    }
  }

  resetEditorState = (text = "") => {
    let newEditorState = ''
    if (text) {
      newEditorState = EditorState.createWithContent(convertFromRaw(text))
    } else{
      newEditorState = EditorState.createEmpty()
    }

    this.setState({
      editorState: newEditorState,
      contentTypePopupOpen: false
    })
  }

  handleReturn = (e, editorState) => {
    if (this.state.contentTypePopupOpen) {
      this.handleContentTypeSelect(this.state.focusedContentType.database_name)
    }else{
      this.changeEditorState(editorState)
    }
  }

  focusMention = (mention) => {
    // mention.ref.current.focus()
    this.setState({focusedContentType: mention})
  }

  handleContentTypeSelect = (style = 'paragraph') => {
    // const selectedMention = this.state.focusedContentType

    // this.props.changeContentType(style, {...this.props.block, text: convertToRaw(this.state.editorBackup ? this.state.editorBackup.getCurrentContent() : this.state.editorState.getCurrentContent())})

    this.props.addBlock(this.props.block, style, () => {
      this.setState({
        contentTypePopupOpen: false
      }, () => this.changeEditorState(this.state.editorBackup))
    })
    // this.props.updateParentBlock({...this.props.block, text: convertToRaw(this.state.editorBackup ? this.state.editorBackup.getCurrentContent() : this.state.editorState.getCurrentContent()), content_type_id: newContentType.id, content_type: newContentType})
  }


  render() {
    const {InlineToolbar, LinkButton} = this.components
    return (
      <div key={this.props.index} className={`block ${this.props.block.content_type.style}`} id={`${this.props.block.id}-container`}>
        <Editor
          readOnly={this.props.readOnly}
          editorKey={'editor'}
          editorState={this.state.editorState}
          placeholder={this.props.block.content_type.style}
          onChange={this.changeEditorState}
          handleReturn={this.handleReturn}
          ref={this.props.myRef}
          plugins={this.plugins}
          onFocus={this.handleFocus}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.myKeyBindingFn}
        />
        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div className="innerToolbar">
                <BoldButton className="button" {...externalProps} />
                <ItalicButton className="button" {...externalProps} />
                <UnderlineButton className="button" {...externalProps} />
                <LinkButton className="button" {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
        <ContentTypePopup
          contentTypes={this.state.contentTypes}
          onOpenChange={this.onOpenChange}
          onSelect={this.handleContentTypeSelect}
          open={this.state.contentTypePopupOpen}
          onFocus={this.focusMention}
          focusedContentType={this.state.focusedContentType}
        />
      </div>
    );
  }
}

export default Block;
