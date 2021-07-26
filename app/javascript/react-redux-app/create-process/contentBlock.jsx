import React, {Component} from 'react'
import {Editor, EditorState, ContentState, RichUtils, getDefaultKeyBinding, KeyBindingUtil} from 'draft-js';
const {hasCommandModifier} = KeyBindingUtil;

const Toolbar = ({left = 0, top = 0, selection, _onBoldClick}) => {
  return(
    <div className="toolbar" style={{position: 'absolute', left: `${left}px`, top: `${top}px`}}>
      <i className={`icon fas fa-book`} onClick={_onBoldClick} />
    </div>
  )
}

// class CustomDraftJSEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.handleKeyCommand = this.handleKeyCommand.bind(this);
//     this.state = {
//       editorState: EditorState.createEmpty()
//     };
//   }

//   handleKeyCommand(command, editorState) {
//     const newState = RichUtils.handleKeyCommand(editorState, command);

//     if (newState) {
//       this.onChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   }

//   onChange = (newState) => {
//     const currentContentState = this.state.editorState.getCurrentContent()
//     const newContentState = newState.getCurrentContent()

//     if (currentContentState !== newContentState) {
//       // There was a change in the content
//       // this.updateEditorState(newState)
//       this.updateEditorState(newState)
//     } else {
//       // The change was triggered by a change in focus/selection
//     }
//   }

//   updateEditorState = (newState) => {
//     this.setState({editorState: newState})
//   }

//   _onBoldClick = () => {
//     this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
//   }

//   render() {
//     const styleMap = {
//       'BOLD': {
//         color: 'green',
//       },
//     };

//     return (
//       <div>
//         <button onClick={this._onBoldClick}>Bold</button>
//         <Editor
//           customStyleMap={styleMap}
//           editorState={this.state.editorState}
//           handleKeyCommand={this.handleKeyCommand}
//           onChange={this.onChange}
//         />
//       </div>
//     );
//   }
// }

class ContentBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.block.text ? EditorState.createWithContent(ContentState.createFromText(`${props.block.text} - ${props.block.content_type.style}`)) : EditorState.createEmpty(),
      prevKey: '',
      toolbar: {
        top: -5,
        left: 0
      }
    };
  }

  componentDidMount(){
    // console.log(this.props.myRef)
  }

  onChange = editorState => {
    const currentContentState = this.state.editorState.getCurrentContent()
    const newContentState = editorState.getCurrentContent()

    if (currentContentState !== newContentState) {
      // There was a change in the content
    } else {
      var selectionState = editorState.getSelection();
      var anchorKey = selectionState.getAnchorKey();
      var currentContent = editorState.getCurrentContent();
      var currentContentBlock = currentContent.getBlockForKey(anchorKey);
      var start = selectionState.getStartOffset();
      var end = selectionState.getEndOffset();
      var selectedText = currentContentBlock.getText().slice(start, end);
      if (selectedText) {
        this.setState({
          toolbar: {
            ...this.state.toolbar,
            left: (start*8)
          },
          showToolbar: true
        })
      } else{
        this.setState({showToolbar: false})
      }
      // The change was triggered by a change in focus/selection

    }
    this.setState({editorState})
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  _onBoldClick = () => {
    const newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
    this.onChange(newState);
  }

  myKeyBindingFn = (e) => {
    switch(e.nativeEvent.keyCode){
      case 8:
        if (!this.state.editorState.getCurrentContent().hasText()) {
          this.props.deleteBlock(this.props.block, this.props.updatedElement, this.props.index);
        }
        return 'backspace'
      case 13: /* `enter` key */
        if (this.state.prevKey !== "Shift") {
          this.props.addBlock(this.props.block, this.props.updatedElement);
        }
        return 'enter_command';
      case 83: /* `S` key */ /* + `Ctrl` key */
        return 'ctrl_s_command';

      case 38: /* `Arrow Up` key */ /* + `Ctrl` key */
        this.props.focusPrevBlock()
        return 'arrow_up';

      case 40: /* `Arrow Down` key */ /* + `Ctrl` key */
        this.props.focusNextBlock(this.props.index, 'thisRef')
        return 'arrow_down';
      case 55: /* `/` key */
        return '_slash'
      default:
        this.setState({prevKey: e.nativeEvent.key})
        return getDefaultKeyBinding(e);
    }
  }

  shouldComponentUpdate() {
    return true
  }

  handleFocus = () => {
    setTimeout(()=> {
      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState)
      })
    })
  }
  //   const editorState = this.state.editorState
  //   const nextOffSet = editorState.getCurrentContent().length
  //   console.log('focused', nextOffSet)

  //   const newSelection = editorState.getSelection().merge({
  //     focusOffset: nextOffSet,
  //     anchorOffset: nextOffSet
  //   })

  //   this.onChange(EditorState.acceptSelection(editorState, newSelection))
  // }


  render() {
    return (
      <div key={this.props.block.react_id}>
        {this.state.showToolbar &&
          <Toolbar left={this.state.toolbar.left} top={this.state.toolbar.top} editorState={this.state.editorState} _onBoldClick={this._onBoldClick} />
        }
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          placeholder={this.props.block.content_type.style}
          onChange={this.onChange}
          keyBindingFn={this.myKeyBindingFn}
          ref={this.props.myRef}
          onFocus={this.handleFocus}
        />
      </div>
    );
  }
}

export default ContentBlock;
