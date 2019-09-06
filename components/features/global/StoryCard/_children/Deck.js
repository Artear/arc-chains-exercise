/* eslint-disable import/no-cycle */
/* React */
import React from "react";
import PropTypes from "prop-types";

/* Configs */
import { mapComponentPropsToStyles, trim } from "./_utils";

const Deck = props => {
  const { deckClasses = "", deckFont = "", deckText, overrides, url } = props;
  return deckText ? (
    <div
      className={trim(`${deckClasses} ${deckFont} isText`)}
      style={mapComponentPropsToStyles(overrides, "deck")}
    >
      {url ? (
        <a href={url}>{deckText}</a>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: deckText }} />
      )}
    </div>
  ) : null;
};

Deck.propTypes = {
  deckClasses: PropTypes.string,
  deckFont: PropTypes.string,
  deckText: PropTypes.string,
  overrides: PropTypes.shape({}),
  url: PropTypes.string
};

export default Deck;
