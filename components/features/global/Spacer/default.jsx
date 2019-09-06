/* React */
import React from "react";
import PropTypes from "prop-types";

const Spacer = props => {
  const {
    border,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight
  } = props.customFields;
  const borderClass =
    border && border !== "none" ? `border_${border} border_1` : "";

  return (
    <span
      className={`spacer | ${borderClass} display_block width_full`}
      style={{
        marginBottom: `${marginBottom}px`,
        marginTop: `${marginTop}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`
      }}
    />
  );
};

Spacer.propTypes = {
  customFields: PropTypes.shape({
    border: PropTypes.oneOf(["none", "bottom", "top"]).tag({
      defaultValue: "none",
      name: "Border"
    }),
    marginBottom: PropTypes.number.tag({
      defaultValue: 0,
      max: 48,
      min: -48,
      step: 1
    }),
    marginTop: PropTypes.number.tag({
      defaultValue: 0,
      max: 48,
      min: -48,
      step: 1
    }),
    marginLeft: PropTypes.number.tag({
      defaultValue: 0,
      max: 48,
      min: -48,
      step: 1
    }),
    marginRight: PropTypes.number.tag({
      defaultValue: 0,
      max: 48,
      min: -48,
      step: 1
    })
  })
};

export default Spacer;
