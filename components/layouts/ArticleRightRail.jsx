/* React */
import React, { Fragment } from "react";
import PropTypes from "prop-types";

/* Styles */
import "./_styles.scss";

const ArticleRightRail = props => {
  const leftRailClasses = "col widescreen-9 desktop-9 tablet-9 width_full";
  const rightRailClasses = "col widescreen-3 desktop-3 tablet-9 width_full";
  return (
    <Fragment>
      {props.children[0]}
      <nav className="nav | grid width_full">{props.children[1]}</nav>
      <div className="top | grid width_full">{props.children[2]}</div>
      <section
        className="main | font_secondary grid width_full"
        style={{
          marginLeft: "10%"
        }}
      >
        <header className={`header | ${leftRailClasses}`}>
          {props.children[3]}
        </header>
        <article className={`article | ${leftRailClasses}`}>
          {props.children[4]}
        </article>
        <aside className={`sidebar | width_full ${rightRailClasses}`}>
          {props.children[5]}
        </aside>
      </section>
      <footer className="footer | grid width_full">{props.children[6]}</footer>
    </Fragment>
  );
};

ArticleRightRail.propTypes = {
  children: PropTypes.node
};

ArticleRightRail.sections = [
  "amp navigation only",
  "nav",
  "top",
  "header",
  "article",
  "sidebar",
  "footer"
];

export default ArticleRightRail;
