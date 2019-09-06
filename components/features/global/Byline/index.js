/* eslint-disable import/no-cycle */
/* React */
import React from "react";
import PropTypes from "prop-types";

/* Utilities */
import { mapComponentPropsToStyles, trim } from "../StoryCard/_children/_utils";

const Byline = props => {
  const authors = [
    "Professional Services",
    "Fusion Platform Team",
    "Arc Staff"
  ];

  const { bylineClasses = "", bylineFont = "", overrides } = props;

  return (
    <div
      className={trim(
        `byline | ${bylineClasses} ${bylineFont} isText width_full`
      )}
      style={mapComponentPropsToStyles(overrides, "byline")}
    >
      <div className="authors">
        By
        {authors.map((author, index) => {
          const secondToLast = authors.length - 2;
          return (
            <span className="author | margin_left_1" key={index}>
              {author}
              {index === secondToLast ? " and" : null}
              {index !== authors.length && index < secondToLast ? "," : null}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Byline;

Byline.propTypes = {
  bylineClasses: PropTypes.string,
  bylineFont: PropTypes.string,
  bylineText: PropTypes.string,
  overrides: PropTypes.shape({})
};
