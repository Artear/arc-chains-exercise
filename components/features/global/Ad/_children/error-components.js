import React from "react";
import PropTypes from "prop-types";

export const NoDFPIdSupplied = () => {
  return <div>No DFP Publisher ID has been supplied via site properties.</div>;
};

export const PlaceholderAd = props => {
  const { adInfo } = props;
  const { dimensions, targeting, name, slotName } = adInfo;

  const placeholderStyles = {
    background: "teal",
    width: "300px",
    height: "250px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "25px"
  };

  const preStyles = {
    width: "100%"
  };

  return (
    <div className="ad | placeholder" style={placeholderStyles}>
      A {name} ad with slot name {slotName} will render here.
      <br />
      <br />
      Targeting information:
      <pre style={preStyles}>{JSON.stringify(targeting, null, 2)}</pre>
      Dimensions:
      <pre style={preStyles}>{JSON.stringify(dimensions, null, 2)}</pre>
    </div>
  );
};

PlaceholderAd.propTypes = {
  adInfo: PropTypes.object
};
