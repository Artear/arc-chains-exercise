/* React */
import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Homepage = props => {
  return (
    <Fragment>
      <div className="head | width_full">{props.children[0]}</div>
      <div
        className="body | grid width_full"
        style={{
          margin: "2% 5%"
        }}
      >
        {props.children[1]}
      </div>
      <footer className="footer | width_full">{props.children[2]}</footer>
    </Fragment>
  );
};

Homepage.propTypes = {
  children: PropTypes.node
};

Homepage.sections = ["head", "body", "footer"];

export default Homepage;
