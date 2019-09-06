/* eslint-disable arrow-body-style */
/* React */
import React from "react";
import PropTypes from "prop-types";

const quotePropTypes = {
  classes: PropTypes.string,
  citation: PropTypes.string,
  citationClasses: PropTypes.string,
  type: PropTypes.oneOf(["blockquote", "pullquote"]),
  text: PropTypes.string
};

export const Blockquote = ({
  classes = null,
  citation,
  citationClasses = null,
  text
}) => {
  const citationElement = citation ? (
    <cite className={citationClasses}>{citation}</cite>
  ) : null;

  return (
    <blockquote className={classes}>
      <div className="text">{text}</div>
      {citationElement}
    </blockquote>
  );
};

Blockquote.propTypes = quotePropTypes;

export const Pullquote = ({ classes, ...props }) => (
  <aside className={classes}>
    <Blockquote {...props} />
  </aside>
);

Pullquote.propTypes = quotePropTypes;
