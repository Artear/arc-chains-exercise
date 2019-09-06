/* eslint-disable */
/* React */
import React from "react";
import PropTypes from "prop-types";

/* Configs */
import {
  mapComponentPropsToStyles,
  trim
} from "../StoryCard/_children/_utils";

const Headlines = props => {
  const {
    headlineClasses = "",
    headlineLevel = 2,
    headlineFont = "",
    headlineText,
    headlinesContainerClasses = "",
    overrides,
    subheadlineClasses = "",
    subheadlineLevel = 3,
    subheadlineText,
    url
  } = props;

  const HLevel = `h${headlineLevel}`;
  const SHLevel = `h${subheadlineLevel}`;

  return (
    <div
      className={trim(
        `${headlinesContainerClasses} ${headlineFont} bold isText`
      )}
    >
      {headlineText && (
        <HLevel
          className={headlineClasses}
          style={mapComponentPropsToStyles(overrides, "headline")}
        >
          {url ? (
            <a href={url}>{headlineText}</a>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: headlineText }} />
          )}
        </HLevel>
      )}

      {subheadlineText && (
        <SHLevel
          className={subheadlineClasses}
          style={mapComponentPropsToStyles(overrides, "subHeadline")}
        >
          {url ? (
            <a href={url}>{subheadlineText}</a>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: subheadlineText }} />
          )}
        </SHLevel>
      )}
    </div>
  );
};

Headlines.propTypes = {
  headlineClasses: PropTypes.string,
  headlineLevel: PropTypes.number,
  headlineText: PropTypes.string,
  headlinesContainerClasses: PropTypes.string,
  overrides: PropTypes.shape({}),
  subheadlineClasses: PropTypes.string,
  subheadlineLevel: PropTypes.number,
  subheadlineText: PropTypes.string,
  url: PropTypes.string
};

export default Headlines;
