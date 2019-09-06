/* React */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import { AmpImage } from "../Image";

/* Configs */
import { fontSizeOptions } from "../StoryCard/_children/_configs";

/* Styles */
import "./_footer.scss";

const Logo = props => {
  const { logoColor } = props.customFields;
  const imageUrl = `${
    props.contextPath
  }/resources/images/arc-logo-${logoColor}.png`;
  const imageProps = {
    url: imageUrl,
    className: "logo"
  };

  const ampImageProps = {
    ...imageProps,
    height: "44",
    width: "40"
  };

  if (props.isAmp) return <AmpImage {...ampImageProps} />;

  return <img className="logo" src={imageUrl} />;
};

Logo.propTypes = {
  customFields: PropTypes.shape({
    logoColor: PropTypes.string
  }),
  contextPath: PropTypes.string,
  isAmp: PropTypes.bool
};

@Consumer
class Footer extends PureComponent {
  render() {
    const {
      defaultBackgroundColor,
      defaultTextColor,
      siteName
    } = this.props.siteProperties;
    const {
      backgroundColor = defaultBackgroundColor,
      fontSize,
      textColor = defaultTextColor
    } = this.props.customFields;

    return (
      <div
        className="footer | grid width_full"
        style={{
          height: "75px",
          backgroundColor,
          color: textColor,
          fontFamily: "Source Sans Pro"
        }}
      >
        <Logo {...this.props} />
        {siteName && (
          <div
            className="site_name | color_white width_full"
            style={{
              fontSize
            }}
          >
            {siteName}
          </div>
        )}
        <div className="copyright | float_right">
          Copyright {new Date().getFullYear()}
        </div>
      </div>
    );
  }
}

Footer.static = true;

Footer.propTypes = {
  customFields: PropTypes.shape({
    backgroundColor: PropTypes.string.tag({
      name: "Background Color"
    }),
    fontSize: PropTypes.oneOf(fontSizeOptions).tag({
      name: "Font Size"
    }),
    logoColor: PropTypes.oneOf(["black", "white"]).tag({
      defaultValue: "white"
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

export default Footer;
