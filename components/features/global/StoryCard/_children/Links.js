/* eslint-disable import/no-cycle */
/* eslint-disable arrow-body-style */
/* React */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

/* Configs */
import { trim } from "./_utils";

class Links extends PureComponent {
  render() {
    const {
      links,
      linksBulletColor,
      linksClasses,
      linksColor,
      linksFontSize,
      showBullet = true
    } = this.props;

    const symbolSize = linksFontSize ? linksFontSize * 0.8 : 6;

    return links && links.length > 0
      ? links.map((link, index) => (
          <div
            key={index}
            className={trim(`links | ${linksClasses} width_full isText`)}
          >
            {showBullet && (
              <span
                className="symbol | margin_right_2 float_left"
                style={{
                  backgroundColor: linksBulletColor
                    ? `${linksBulletColor}`
                    : "#757575",
                  borderRadius: "5px",
                  width: symbolSize ? `${symbolSize}px` : "auto",
                  height: symbolSize ? `${symbolSize}px` : "auto",
                  marginTop: linksFontSize <= 12 ? "4px" : "6px"
                }}
              />
            )}
            <span
              className="link"
              style={{
                color: linksColor
              }}
            >
              <a href={link.url} target="_self">
                {link.text}
              </a>
            </span>
          </div>
        ))
      : null;
  }
}

/* eslint-disable */
Links.propTypes = {
  links: PropTypes.array,
  linksBulletColor: PropTypes.string,
  linksClasses: PropTypes.string,
  linksColor: PropTypes.string,
  linksFontSize: PropTypes.number,
  showBullet: PropTypes.bool
};

export default Links;
