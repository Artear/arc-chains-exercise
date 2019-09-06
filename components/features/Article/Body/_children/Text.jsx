/* React */
import React from "react";
import PropTypes from "prop-types";

const Text = props => {
  const { classes, content } = props;

  return (
    <p className={classes} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

Text.propTypes = {
  classes: PropTypes.string,
  content: PropTypes.string
};

export default Text;
