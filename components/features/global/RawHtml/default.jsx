/* React */
import React from "react";
import PropTypes from "prop-types";

const RawHTML = props => {
  const { classes = "", content = "", type = "default" } =
    props.customFields || props;

  return (
    <div
      className={`${classes} | ${type}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

RawHTML.propTypes = {
  content: PropTypes.string,
  customFields: PropTypes.shape({
    content: PropTypes.string.tag({
      formPlugin: "wysiwyg-editor"
    })
  })
};

export default RawHTML;
