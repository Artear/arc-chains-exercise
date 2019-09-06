import React from "react";
import ReactDOM from "react-dom";
import WysiwygEditor from "./wysiwyg-editor.jsx";

window.pluginOptions = {
  height: "300px",
  width: "451px"
};

window.initializePlugin = (options = {}) => {
  const mountNode = document.getElementById("plugin");

  const { field, initVal, onSave, onClose } = options;

  ReactDOM.render(
    React.createElement(WysiwygEditor, {
      field,
      initVal,
      onSave,
      onClose
    }),
    mountNode
  );
};
