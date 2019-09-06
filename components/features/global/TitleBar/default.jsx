/* React */
import React from "react";
import PropTypes from "prop-types";

/* Props */
import { titleBarProps } from "../StoryCard/_children/_props";

/* Utilities */
import { mapComponentPropsToStyles, trim } from "../StoryCard/_children/_utils";

const TitleBar = props => {
  const titleBarClasses =
    "title_bar | border_box font_secondary margin_bottom_2 width_full";

  const { title } = props.customFields || props;
  if (title) {
    const { titleBarColor = "black", titleBarType = "" } =
      props || props.customFields;
    const titleClasses = `title | background_inherit bold uppercase`;

    return (
      <div
        className={trim(
          `${titleBarClasses} ${titleBarType} display_inline_block relative`
        )}
        style={mapComponentPropsToStyles(
          props.title ? props : props.customFields,
          "titleBar"
        )}
      >
        {titleBarType === "accent" && (
          <span
            className="bar | border_bottom border_4 float_left"
            style={{
              borderColor: titleBarColor,
              width: "30px"
            }}
          />
        )}
        <div
          className={titleClasses}
          style={mapComponentPropsToStyles(
            props.title ? props : props.customFields,
            "title"
          )}
        >
          {title}
        </div>
        {titleBarType === "ruler" && (
          <span
            className="bar | border_bottom border_1 display_inline_block float_left width_full"
            style={{
              borderColor: titleBarColor,
              marginTop: 5.5
            }}
          />
        )}
      </div>
    );
  }
  return null;
};

TitleBar.static = true;

TitleBar.propTypes = {
  customFields: PropTypes.shape({
    ...titleBarProps()
  }),
  title: PropTypes.string,
  titleBarType: PropTypes.string,
  titleColor: PropTypes.string,
  titleFontSize: PropTypes.number
};

export default TitleBar;
