/* React */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/* Components */
import TitleBar from "../features/global/TitleBar/default";

/* Configs */
import {
  columnsProps,
  titleBarProps
} from "../features/global/StoryCard/_children/_props";

/* Utilities */
import {
  getColumnSizeClasses,
  trim
} from "../features/global/StoryCard/_children/_utils";

class DefaultChain extends PureComponent {
  render() {
    const {
      border,
      widescreenColumns,
      desktopColumns,
      tabletColumns,
      mobileColumns,
      title,
      titleBarBackgroundColor,
      titleBarColor,
      titleBarFontSize,
      titleBarType,
      titleColor
    } = this.props.customFields;

    const borderClass =
      border && border !== "none" ? `border_${border} border_1` : "";
    const sizeClasses = getColumnSizeClasses(
      widescreenColumns,
      desktopColumns,
      tabletColumns,
      mobileColumns
    );
    const classes = `align_items_start ${borderClass} ${sizeClasses}`;

    return (
      <div
        id={this.props.id}
        className={trim(`chain | ${classes} default grid width_full`)}
      >
        {title && (
          <TitleBar
            title={title}
            titleBarBackgroundColor={titleBarBackgroundColor}
            titleBarType={titleBarType}
            titleColor={titleColor}
            titleBarColor={titleBarColor}
            titleFontSize={titleBarFontSize}
          />
        )}
        {this.props.children}
      </div>
    );
  }
}

/* eslint react/prop-types: 0 */
DefaultChain.propTypes = {
  children: PropTypes.array.isRequired,
  customFields: PropTypes.shape({
    ...titleBarProps(),
    ...columnsProps()
  }),
  id: PropTypes.string.isRequired
};

export default DefaultChain;
