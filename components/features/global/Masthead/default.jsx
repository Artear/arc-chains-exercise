/* React */
import React, { Component } from "react";
import PropTypes from "prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Configs */
import { fontSizeOptions } from "../StoryCard/_children/_configs";

/* Components */
import SideMenu from "./_children/SideMenu";

/* Utilities */
import DateTimeInfo from "../../../utilities/DateTimeInfo";

/* Styles */
import "./_masthead.scss";

@Consumer
class Masthead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: true
    };
  }

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  render() {
    const {
      defaultBackgroundColor,
      defaultTextColor
    } = this.props.siteProperties;
    const {
      backgroundColor = defaultBackgroundColor,
      fontSize,
      siteName,
      textColor = defaultTextColor
    } = this.props.customFields;
    const getSiteName = () => {
      return siteName && siteName !== ""
        ? siteName
        : this.props.siteProperties.siteName;
    };
    const date = new Date();
    const dateTime = DateTimeInfo(date, false);

    return (
      <div
        className="masthead | display_flex margin_bottom_2 text_align_center width_full"
        style={{
          height: "75px",
          backgroundColor,
          color: textColor,
          fontFamily: "Source Sans Pro"
        }}
      >
        <SideMenu
          classes={this.state.isMenuOpen ? "slide_closed" : "slide_open"}
        />
        <span
          className="menu | absolute hamburger margin_left_2 margin_top_2 pointer"
          onClick={() => {
            this.toggleMenu();
          }}
        >
          <span className="label | absolute bold margin_left_1 margin_top_2">
            MENU
          </span>
        </span>
        <span
          className="site_name | bold width_full"
          style={{
            marginTop: "8px",
            fontSize
          }}
        >
          {getSiteName()}
        </span>
        <time className="datetime | font_primary float_right margin_top_1">
          {dateTime}
        </time>
      </div>
    );
  }
}

Masthead.propTypes = {
  customFields: PropTypes.shape({
    siteName: PropTypes.string.tag({
      name: "Site Name"
    }),
    backgroundColor: PropTypes.string.tag({
      name: "Background Color"
    }),
    fontSize: PropTypes.oneOf(fontSizeOptions).tag({
      name: "Font Size"
    }),
    textColor: PropTypes.string.tag({
      name: "Text Color"
    })
  }),
  siteProperties: PropTypes.shape({
    defaultBackgroundColor: PropTypes.string,
    defaultTextColor: PropTypes.string,
    siteName: PropTypes.string
  })
};

export default Masthead;
