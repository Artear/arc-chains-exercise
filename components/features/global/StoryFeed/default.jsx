/* eslint-disable */
/* React */
import React, { PureComponent } from "react";
import PropTypes from "fusion:prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import StoryCard from "../StoryCard/default";
import TitleBar from "../TitleBar/default";

/* Configs */
import {
  borderValues,
  defaultTerms,
  defaultView,
  fontSizeOptions,
  getViewNames,
  imageAlignmentValues,
  textDecorations
} from "../StoryCard/_children/_configs";

/* Props */
import {
  cardsPerRowProps,
  columnsProps,
  createCuratedPropsByElement,
  getThemeProps,
  imageProps,
  overlayProps,
  spacerProps,
  textElementProps,
  textProps,
  titleBarProps
} from "../StoryCard/_children/_props";

/* Utilities */
import {
  getColumnSizeClasses,
  getImageAlignmentClasses,
  getTextClasses,
  getThemeFromCustomFields,
  mapComponentPropsToStyles,
  trim
} from "../StoryCard/_children/_utils";
import { getWikipediaArticles } from "../../../utilities/Wikipedia";

@Consumer
class StoryFeed extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.view = props.customFields.view || defaultView;
    if (!props.data) {
      getWikipediaArticles(
        (props.customFields.content && props.customFields.content.split(",")) || defaultTerms, this
      );
    }
  }

  logCustomFields() {
    console.log((JSON.stringify(getThemeFromCustomFields(this.props.customFields))));
  }

  render() {
    const data = this.props.data || this.state.data;

    const {
      border,
      desktopCardsPerRow,
      desktopContainerColumns,
      imageAlignment,
      imageThumbnail,
      lazyLoad,
      mobileCardsPerRow,
      mobileContainerColumns,
      numberedCards,
      tabletCardsPerRow,
      tabletContainerColumns,
      textDecoration,
      title,
      titleBarBackgroundColor,
      titleBarColor,
      titleBarFontSize,
      titleBarType,
      widescreenCardsPerRow,
      widescreenContainerColumns
    } = this.props.customFields;

    const containerSizeClasses = getColumnSizeClasses(
      widescreenContainerColumns,
      desktopContainerColumns,
      tabletContainerColumns,
      mobileContainerColumns
    );
    const cardSizeClasses = getColumnSizeClasses(
      widescreenCardsPerRow,
      desktopCardsPerRow,
      tabletCardsPerRow,
      mobileCardsPerRow,
      true
    );

    if (data && Object.getOwnPropertyNames(data).length > 0) {
      const themeClasses = this.props.customFields.theme || "";
      const isNumbered = numberedCards ? "numbered_list" : "";
      return (
        <div className={trim(`story_feed | ${containerSizeClasses} ${isNumbered} ${themeClasses} margin_bottom_2 relative width_full`)}
          style={mapComponentPropsToStyles(this.props.customFields, "storyFeed")}>
          {this.props.isAdmin && (
            <button className="button | customFields" onClick={() => { this.logCustomFields() }}>
              Custom Fields
            </button>)
          }
          <ul className="container | grid height_full width_full">
            <TitleBar
              title={title}
              titleBarBackgroundColor={titleBarBackgroundColor}
              titleBarType={titleBarType}
              titleColor={titleBarColor}
              titleFontSize={titleBarFontSize}
            />
            {Object.values(data).map((article, index) => {
              if (article.data && article.data.length > 0) {
                const currentCard = index + 1;
                const overrides = this.props.customFields;
                const bylineFontSize = overrides[`bylineFontSize${currentCard}`] || overrides.bylineFontSize;
                const deckFontSize = overrides[`deckFontSize${currentCard}`] || overrides.deckFontSize;
                const headlineFontSize = overrides[`headlineFontSize${currentCard}`] || overrides.headlineFontSize;
                const linksFontSize = overrides[`linksFontSize${currentCard}`] || overrides.linksFontSize;
                const imageAlignmentOverride = overrides[`imageAlignment${currentCard}`];
                const overlineFontSize = overrides[`overlineFontSize${currentCard}`] || overrides.overlineFontSize;
                const viewOverride = overrides[`view${currentCard}`];
                const imageAlignmentClasses = getImageAlignmentClasses(
                  imageAlignmentOverride || imageAlignment,
                  viewOverride || this.view
                );
                const imageThumbnailClass = imageThumbnail ? "thumbnail" : "";
                const textClasses = getTextClasses(textDecoration || overrides[`textDecoration${currentCard}`]);
                const cardClasses = trim(
                  `card | align_items_start ${textClasses} ${imageAlignmentClasses} ${imageThumbnailClass} width_full`
                );

                return (
                  <li key={currentCard} className={`list_item | ${cardSizeClasses}`}>
                    <StoryCard
                      border={border}
                      bylineFontSize={bylineFontSize}
                      classes={cardClasses}
                      data={article}
                      deckClasses="deck | "
                      deckFontSize={deckFontSize}
                      headlinesContainerClasses="headline | width_full"
                      headlineFontSize={headlineFontSize}
                      key={`${article.term}_${index}`}
                      lazyLoad={lazyLoad}
                      linksFontSize={linksFontSize}
                      number={numberedCards ? currentCard : null}
                      overlineClasses="overline | "
                      overlineFontSize={overlineFontSize}
                      overlineText={article.term}
                      overrides={overrides}
                      responsiveText={overrides.responsiveText}
                      responsiveTextScale={overrides.responsiveTextScale}
                      storyCardBackgroundColor={overrides.backgroundColor}
                      view={viewOverride || this.view}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
      );
    }
    return null;
  }
}

/* eslint react/prop-types: 0 */
StoryFeed.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.string.tag({
      group: "Data Configuration",
      name: "Content Source"
    }),
    view: PropTypes.oneOf(getViewNames()).tag({
      defaultValue: defaultView,
      group: "Feed",
      name: "View"
    }),
    ...getThemeProps("Feed"),
    backgroundColor: PropTypes.string.tag({
      group: "Feed",
      name: "Background Color"
    }),
    border: PropTypes.oneOf(borderValues).tag({
      defaultValue: "none",
      group: "Feed",
      name: "Border"
    }),
    ...textProps(),
    numberedCards: PropTypes.bool.tag({
      defaultValue: false,
      group: "Feed",
      name: "Numbered"
    }),
    lazyLoad: PropTypes.bool.tag({
      defaultValue: false,
      group: "Feed",
      name: "Lazy Load Cards"
    }),
    ...titleBarProps(),
    ...textElementProps("overline", "Overline", false, true),
    ...textElementProps("headline", "Headline", false, true),
    ...textElementProps("deck", "Deck", false, true),
    ...textElementProps("byline", "Byline", false, true),
    ...textElementProps("links", "Links", false, true),
    // merge overlay + image
    ...imageProps,
    ...spacerProps("storyFeed", "Padding"),
    ...spacerProps("storyFeed", "Margin"),
    ...overlayProps(),
    ...columnsProps("ContainerColumns", "Container Columns"),
    ...cardsPerRowProps(),
    ...createCuratedPropsByElement("View", "", "oneOf", getViewNames()),
    ...createCuratedPropsByElement("Image", "Alignment", "oneOf", imageAlignmentValues),
    ...createCuratedPropsByElement("Text", "Decorations", "oneOf", textDecorations),
    ...createCuratedPropsByElement("Overline", "FontSize", "oneOf", fontSizeOptions),
    ...createCuratedPropsByElement("Headline", "FontSize", "oneOf", fontSizeOptions),
    ...createCuratedPropsByElement("Deck", "FontSize", "oneOf", fontSizeOptions),
    ...createCuratedPropsByElement("Byline", "FontSize", "oneOf", fontSizeOptions),
    ...createCuratedPropsByElement("Links", "FontSize", "oneOf", fontSizeOptions),
  })
};

export default StoryFeed;
