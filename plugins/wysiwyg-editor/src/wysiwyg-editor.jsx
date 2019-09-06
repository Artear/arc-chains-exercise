/*
  This plugin is provided as an example of a more advanced plugin you can use
  to modify your custom fields.

  It is not supported by the Core Components team currently, but hopefully it gives
  you an idea of how plugins work within PageBuilder Fusion.
*/

/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// React
import React, { Component } from "react";

// Polyfills
import "@babel/polyfill";

// External Modules
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

// Styling
import "draft-js/dist/Draft.css";
import "./style.css";

// Internal Modules
import {
  getHyperlinkFromSelection,
  insertLinkIntoState,
  linkDecorator,
  removeLinkFromState
} from "./hyperlink-utils.jsx";

// Helpers & Constants

const blockStyles = {
  "header-one": "H1",
  "header-two": "H2",
  "header-three": "H3",
  "header-four": "H4",
  "header-five": "H5",
  "header-six": "H6",
  paragraph: <i className="fas fa-paragraph" />,
  "unordered-list-item": <i className="fas fa-list-ul" />,
  "ordered-list-item": <i className="fas fa-list-ol" />,
  blockquote: <i className="fas fa-quote-right" />,
  "code-block": <i className="fas fa-file-code" />
};

const inlineStyles = {
  BOLD: <i className="fas fa-bold" />,
  ITALIC: <i className="fas fa-italic" />,
  UNDERLINE: <i className="fas fa-underline" />,
  CODE: <i className="fas fa-code" />
};

const blockStyleFn = contentBlock => {
  const type = contentBlock.getType();
  switch (type) {
    case "blockquote":
      return "arc-blockquote";
    case "code-block":
      return "arc-codeblock";
    default:
      return null;
  }
};

const styleMap = {
  CODE: {
    color: "magenta",
    "font-family": "monospace",
    background: "#ddd",
    padding: "0px 3px",
    "border-radius": "3px",
    border: "1px solid #ccc"
  }
};

// Component Code

export default class WysiwygEditor extends Component {
  constructor(props) {
    super(props);

    const initialState =
      props && props.initVal
        ? EditorState.createWithContent(
            stateFromHTML(props.initVal),
            linkDecorator
          )
        : EditorState.createEmpty(linkDecorator);

    this.state = {
      editorState: initialState,
      showURLInput: false,
      hyperlinkInputVal: ""
    };
  }

  handleBlockClick = style => {
    return this.onEditorChange(
      RichUtils.toggleBlockType(this.state.editorState, style)
    );
  };

  handleInlineClick = style => {
    return this.onEditorChange(
      RichUtils.toggleInlineStyle(this.state.editorState, style)
    );
  };

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) return this.onEditorChange(newState);
    return false;
  };

  handleLinkCancel = () => {
    this.setState(
      {
        showURLInput: false,
        hyperlinkInputVal: ""
      },
      () => {
        setTimeout(() => {
          /* eslint-disable-next-line */
          return this.refs.editor.focus();
        }, 0);
      }
    );
  };

  handleLinkConfirm = () => {
    const { editorState, hyperlinkInputVal } = this.state;
    const newState = insertLinkIntoState(editorState, hyperlinkInputVal);

    this.setState(
      {
        editorState: newState,
        showURLInput: false,
        hyperlinkInputVal: ""
      },
      () => {
        setTimeout(() => {
          /* eslint-disable-next-line */
          return this.refs.editor.focus();
        }, 0);
      }
    );
  };

  handleLinkInputKeyDown = e => {
    if (e && e.nativeEvent && e.nativeEvent.which === 13) {
      this.handleLinkConfirm(e);
    }
  };

  handleLinkPrompt = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const url = getHyperlinkFromSelection(editorState);

    this.setState(
      {
        showURLInput: true,
        hyperlinkInputVal: url
      },
      () => {
        setTimeout(() => {
          /* eslint-disable-next-line */
          return this.refs.url.focus();
        }, 0);
      }
    );
  };

  handleRemoveLink = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const newState = removeLinkFromState(editorState);

    this.onEditorChange(newState);
  };

  handleSave = () => {
    const {
      onSave = () => {
        // eslint-disable-next-line
        console.error("No `onSave` method was passed");
      }
    } = this.props;
    const html = stateToHTML(this.state.editorState.getCurrentContent());
    onSave(html);
  };

  handleURLChange = e => {
    return this.setState({ hyperlinkInputVal: e.target.value });
  };

  onEditorChange = editorState => {
    return this.setState({ editorState });
  };

  render() {
    const {
      onClose = () => {
        // eslint-disable-next-line no-console
        console.error("No `onClose` method was passed");
      }
    } = this.props;

    let urlInput = "";
    if (this.state.showURLInput) {
      urlInput = (
        <div className="hyperlink-input">
          <input
            onChange={this.handleURLChange}
            // eslint-disable-next-line react/no-string-refs
            ref="url"
            type="text"
            value={this.state.hyperlinkInputVal}
            onKeyDown={this.handleLinkInputKeyDown}
          />
          <button
            onMouseDown={this.handleLinkConfirm}
            className="btn btn-success"
          >
            Confirm
          </button>
          <button
            onMouseDown={this.handleLinkCancel}
            className="btn btn-cancel"
          >
            Cancel
          </button>
        </div>
      );
    }

    return (
      <div className="editor-container">
        <div className="toolbar">
          <div className="row">
            {Object.keys(inlineStyles).map(style => {
              const icon = inlineStyles[style];
              return (
                <span
                  onClick={() => {
                    this.handleInlineClick(style);
                  }}
                >
                  {icon}
                </span>
              );
            })}
            |
          </div>
          <div className="row">
            {Object.keys(blockStyles).map(style => {
              const icon = blockStyles[style];
              return (
                <span
                  onClick={() => {
                    this.handleBlockClick(style);
                  }}
                >
                  {icon}
                </span>
              );
            })}
            |
          </div>
          <div className="row">
            <span id="add-hyperlink-container" onClick={this.handleLinkPrompt}>
              <i className="fas fa-link" />
              {urlInput}
            </span>
            <span onClick={this.handleRemoveLink}>
              <i className="fas fa-unlink" />
            </span>
            |
          </div>
        </div>
        <div className="editor">
          <Editor
            blockStyleFn={blockStyleFn}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onEditorChange}
            placeholder="Hello world!"
            // eslint-disable-next-line react/no-string-refs
            ref="editor"
          />
        </div>
        <div className="actions-bar">
          <button className="btn btn-success" onClick={this.handleSave}>
            Save
          </button>
          <button className="btn btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
