/* eslint-disable */
/* React */
import React, { Fragment } from "react";
import PropTypes from "prop-types";

/* Configs */
import { mapComponentPropsToStyles, trim } from "./_utils";

const Overline = props => {
  const {
    overlineClasses = "",
    overlineFont = "",
    overlineText,
    overrides,
    url
  } = props;

  const getText = () => {
    return url ? (
      <a href={url}>{overlineText}</a>
    ) : (
      <Fragment>{overlineText}</Fragment>
    );
  };

  return overlineText ? (
    <h3
      className={trim(`${overlineClasses} ${overlineFont} isText`)}
      style={mapComponentPropsToStyles(overrides, "overline")}
    >
      {getText()}
    </h3>
  ) : null;
};

Overline.propTypes = {
  overlineClasses: PropTypes.string,
  overlineFont: PropTypes.string,
  overlineText: PropTypes.string,
  overrides: PropTypes.shape({}),
  url: PropTypes.string
};

export default Overline;
