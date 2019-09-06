/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* React */
import React, { PureComponent } from "react";
import PropTypes from "fusion:prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import StoryCard from "~/components/features/global/StoryCard/default";
import TitleBar from "~/components/features/global/TitleBar/default";

/* Utilities */
import { defaultTerms } from "../StoryCard/_children/_configs";
import { getWikipediaArticles } from "../../../utilities/Wikipedia";

/* Constants */
const columnRatioOptions = [
  "2x5x5",
  "2x8x2",
  "2x6x4",
  "3x4x5",
  "3x6x3",
  "3x7x2",
  "4x3x5",
  "4x4x4",
  "4x6x2",
  "5x3x4",
  "5x5x2",
  "5x2x5",
  "6x3x3",
  "6x4x2",
  "7x2x3",
  "7x3x2",
  "8x2x2"
];

@Consumer
class SectionGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    getWikipediaArticles(defaultTerms, this);
  }

  render() {
    const { data } = this.state;
    if (data && Object.getOwnPropertyNames(data).length > 0) {
      const {
        columnRatios,
        title,
        leftNumberCards = 1,
        leftHeadlineFont = "font_primary",
        leftDeckFont = "font_tertiary",
        middleNumberCards = 3,
        middleHeadlineFont = "font_tertiary",
        middleDeckFont = "font_primary",
        rightNumberCards = 4,
        rightHeadlineFont = "font_primary",
        rightDeckFont = "font_tertiary",
        bottomHeadlineFont = "font_secondary",
        bottomDeckFont = "font_primary"
      } = this.props.customFields;

      const middleContentElements = [];
      const rightContentElements = [];
      const bottomContentElements = [];

      const columnValues = columnRatios.split("x");
      const leftColumns = `widescreen-${columnValues[0]} desktop-${
        columnValues[0]
      } tablet-6`;
      const middleColumns = `widescreen-${columnValues[1]} desktop-${
        columnValues[1]
      } tablet-6`;
      const rightColumns = `widescreen-${columnValues[2]} desktop-${
        columnValues[2]
      } tablet-12`;
      const bottomColumns = "widescreen-2_4 desktop-2_4 tablet-12";

      const generateSection = (section, cards) => {
        if (section === "middle" && cards.length > 0) {
          return (
            <div className={`grid col ${middleColumns}`}>
              {cards.map((card, index) => {
                const view =
                  index === 0 ? "Image, Headline, Deck" : "Headline, Deck";
                return (
                  <StoryCard
                    data={card.card}
                    deckFont={middleDeckFont}
                    deckFontSize={14}
                    headlineFont={middleHeadlineFont}
                    headlineFontSize={18}
                    key={`${section}_${index}`}
                    overrides={this.props.customFields}
                    view={view}
                  />
                );
              })}
            </div>
          );
        }
        if (section === "right" && cards.length > 0) {
          return (
            <div className={`grid col ${rightColumns}`}>
              {cards.map((card, index) => {
                if (index === 0) {
                  return (
                    <StoryCard
                      data={card.card}
                      deckFontSize={14}
                      headlineFontSize={26}
                      key={`${section}_${index}`}
                      overrides={this.props.customFields}
                      view={"Image, Headline"}
                    />
                  );
                }
                return (
                  <StoryCard
                    border="bottom"
                    data={card.card}
                    deckFont={rightDeckFont}
                    deckFontSize={18}
                    headlineFont={rightHeadlineFont}
                    headlineFontSize={22}
                    key={`${section}_${index}`}
                    overrides={this.props.customFields}
                    view={"Headline"}
                  />
                );
              })}
            </div>
          );
        }
        if (section === "bottom" && cards.length > 0) {
          return (
            <ul className={`grid col width_full`}>
              {cards.map((card, index) => {
                return (
                  <li
                    className={`list_item | col ${bottomColumns}`}
                    key={`${section}_${index}`}
                  >
                    <StoryCard
                      data={card.card}
                      deckFont={bottomDeckFont}
                      deckFontSize={12}
                      headlineFont={bottomHeadlineFont}
                      headlineFontSize={22}
                      overrides={this.props.customFields}
                      view={"Image, Headline"}
                    />
                  </li>
                );
              })}
            </ul>
          );
        }
        return null;
      };

      return (
        <div className="story_feed | align_items_start grid width_full">
          <TitleBar title={title} />
          {Object.values(data).map((card, index) => {
            if (index === leftNumberCards - 1) {
              return (
                <div key={index} className={`grid col ${leftColumns}`}>
                  <StoryCard
                    data={card}
                    deckFont={leftDeckFont}
                    deckFontSize={18}
                    headlineFont={leftHeadlineFont}
                    headlineFontSize={34}
                    overrides={this.props.customFields}
                    view={"Image, Headline, Deck"}
                  />
                </div>
              );
            }
            if (index > leftNumberCards - 1 && index < middleNumberCards) {
              middleContentElements.push({
                card,
                index
              });
            } else if (
              index >= leftNumberCards + middleNumberCards - 1 &&
              index < leftNumberCards + middleNumberCards + rightNumberCards - 1
            ) {
              rightContentElements.push({
                card,
                index
              });
            } else {
              bottomContentElements.push({
                card,
                index
              });
            }
          })}
          {generateSection("middle", middleContentElements)}
          {generateSection("right", rightContentElements)}
          {generateSection("bottom", bottomContentElements)}
        </div>
      );
    }
    return null;
  }
}

/* eslint react/prop-types: 0 */
SectionGenerator.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      group: "Global View",
      name: "Title"
    }),
    columnRatios: PropTypes.oneOf(columnRatioOptions).tag({
      group: "Global View",
      name: "Columns",
      defaultValue: "7x2x3"
    })
  })
};

export default SectionGenerator;
