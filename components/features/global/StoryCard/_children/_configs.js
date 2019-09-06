/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* React */
import React, { Fragment } from "react";

/* Components */
import Byline from "../../Byline";
import Deck from "./Deck";
import Headline from "../../Headline";
import Image from "../../Image";
import LazyImage from "../../LazyImage";
import Links from "./Links";
import Overline from "./Overline";
import PlayIcon from "./PlayIcon";

/* Utilities */
import { getWikipediaLinks } from "../../../../utilities/Wikipedia";
import { getTextClasses, mapComponentPropsToStyles, trim } from "./_utils";

/* Constants */
export const borderValues = [
  "none",
  "all",
  "bottom",
  "bottom, left",
  "bottom, right",
  "bottom, top",
  "left",
  "left, right",
  "left, top",
  "right",
  "right, top",
  "top"
];
export const defaultTerms = [
  "dog",
  "cat",
  "bird",
  "horse",
  "giraffe",
  "elephant",
  "starfish",
  "donkey",
  "moose",
  "narwhal",
  "unicorn",
  "velociraptor"
];
export const defaultProfiles = [
  "Abraham Lincoln",
  "Eleanor Roosevelt",
  "George Washington",
  "Genghis Khan",
  "Bob Ross",
  "Harriet Tubman",
  "Alan Turing",
  "Winston Churchill",
  "Margaret Thatcher",
  "Mark Twain"
];
export const defaultView = "Image, Headline, Deck";
export const defaultDeckClasses = { deckClasses: "deck | " };
export const defaultHeadlinesContainerClasses = {
  headlinesContainerClasses: "headline | width_full"
};
export const defaultOverlineClasses = { overlineClasses: "overline | " };
export const defaultOverlineFontSize = 12;
export const defaultHeadlineFontSize = 21;
export const defaultDeckFontSize = 14;
export const defaultLinksFontSize = 12;
export const directionValues = ["none", "bottom", "left", "right", "top"];
export const elementPositions = () => {
  const bottom = { bottom: "0" };
  const left = { left: "50%" };
  const middle = { top: "50%" };
  const right = { right: "0" };
  const top = { top: "0" };
  const transform = { transform: "translate(-50%, 0%)" };
  return {
    bottom: { ...bottom, ...left, ...transform },
    bottomLeft: { ...bottom },
    bottomRight: { ...bottom, ...right },
    center: { ...left, ...middle, ...transform },
    left: { ...middle },
    right: { ...middle, ...right },
    top: { ...top, ...left, ...transform },
    topLeft: { ...top },
    topRight: { ...top, ...right }
  };
};
export const elementPositionValues = Object.keys(elementPositions());
export const feedColorPalettes = {
  blue: {
    overlayBackgroundColor: "#0c418266",
    overlayTextBackgroundColor: "#a6c6ef",
    overlayTextColor: "",
    overlineColor: "#0615d4db",
    deckColor: "gray"
  },
  cactus: {
    overlayBackgroundColor: "#0d4a1bbf",
    overlayTextBackgroundColor: "#0e630d",
    overlayTextColor: "black",
    overlineColor: "#0b6159",
    headlineColor: "#0f630f",
    deckColor: "#63a589"
  },
  cinnamon: {
    overlayBackgroundColor: "#82000080",
    overlayTextBackgroundColor: "#3a00001a",
    overlayTextColor: "white",
    overlineColor: "#943700",
    headlineColor: "#5a0000",
    deckColor: "#923600"
  },
  purple: {
    overlayBackgroundColor: "rgba(129, 80, 200, .4)",
    overlayTextBackgroundColor: "rgba(129, 80, 200, .2)",
    overlayTextColor: "white",
    overlineColor: "rgba(129, 80, 200, .8)",
    headlineColor: "rgba(129, 80, 200, .6)",
    deckColor: "rgba(40, 40, 40, .95)",
    linksColor: "rgba(129, 80, 200, 1)"
  },
  orange: {
    overlayBackgroundColor: "rgba(190, 140, 40, .7)",
    overlayTextBackgroundColor: "rgba(190, 140, 40, .4)",
    overlayTextColor: "black",
    overlineColor: "rgba(190, 140, 40, 1)",
    headlineColor: "rgba(190, 140, 40, .4)",
    deckColor: "gray",
    linksColor: "rgba(190, 140, 40, .8)"
  }
};
export const feedLayouts = {
  profile: {
    border: "all",
    desktopCardsPerRow: 5,
    mobileCardsPerRow: 1,
    tabletCardsPerRow: 2,
    overlineFontSize: 18,
    overlineFontWeight: "bold",
    overlayTextElements: "Overline",
    overlayTextPosition: "center",
    view: "Overline, Image, Headline, Deck",
    widescreenCardsPerRow: 5
  },
  heroFeed: {
    border: "bottom",
    imageAlignment1: "Right",
    imageAlignment3: "Left",
    imageAlignment4: "Left",
    imageAlignment6: "Right",
    deckFontSize: 18,
    desktopCardsPerRow: 3,
    headlineFontSize1: 22,
    headlineFont: "font_secondary",
    mobileCardsPerRow: 1,
    tabletCardsPerRow: 2,
    overlineFontSize: 24,
    overlineFontWeight: "bold",
    overlayTextElements: "Deck",
    overlayTextPosition: "bottomRight",
    overlayMarginBottom: -10,
    view: "Image, Overline, Headline, Deck",
    widescreenCardsPerRow: 3
  },
  leftThumbnails: {
    border: "all",
    imageAlignment: "Left",
    imageThumbnail: true,
    deckFontSize: 18,
    desktopCardsPerRow: 3,
    headlineFontSize1: 14,
    mobileCardsPerRow: 1,
    tabletCardsPerRow: 2,
    // textDecoration: "centered, italic, bold",
    overlineFontSize: 13,
    overlineFontWeight: "bold",
    overlayTextElements: "Byline",
    overlayTextPosition: "center",
    overlayMarginBottom: -10,
    view: "Overline, Image, Headline",
    widescreenCardsPerRow: 3
  },
  imageLinks: {
    deckFontSize: 18,
    desktopCardsPerRow: 4,
    mobileCardsPerRow: 1,
    tabletCardsPerRow: 2,
    textDecoration1: "centered, bold",
    overlayTextElements: "Byline",
    overlayTextPosition: "bottom",
    overlayMarginTop: -10,
    view: "Image, Links",
    widescreenCardsPerRow: 4
  },
  comics: {
    desktopCardsPerRow: 1,
    desktopContainerColumns: 2,
    imageAlignment: "Vertical",
    mobileCardsPerRow: 1,
    overlayHoverOnly: false,
    overlayMarginBottom: 20,
    overlayMarginLeft: 20,
    overlayTextElements: "Overline",
    overlayTextPosition: "bottomLeft",
    tabletCardsPerRow: 1,
    titleBarType: "accent",
    view: "Image",
    widescreenCardsPerRow: 1,
    widescreenContainerColumns: 2
  },
  opinions: {
    view: "Headline, Image, Overline",
    border: "none",
    responsiveTextScale: 0.9,
    title: "Opinions",
    titleBarFontSize: 27,
    titleBarType: "accent",
    overlineFontSize: 14,
    overlineTextDecorations: "centered, bold",
    overlineResponsiveTextScale: 0.9,
    headlineFontSize: 14,
    headlineResponsiveTextScale: 0.9,
    deckResponsiveTextScale: 0.9,
    bylineResponsiveTextScale: 0.9,
    linksResponsiveTextScale: 0.9,
    imageAlignment: "Vertical",
    imageRound: true,
    overlayTextElements: "none",
    widescreenCardsPerRow: 4,
    desktopCardsPerRow: 4,
    tabletCardsPerRow: 1,
    mobileCardsPerRow: 1,
    classes: "card | align_items_start null imageVertical width_full",
    deckClasses: "deck | ",
    headlinesContainerClasses: "headline | width_full",
    overlineClasses: "overline | ",
    overlineText: "Harriet_Tubman"
  },
  listado: {
    view: "Image, Headline, Deck",
    border: "bottom",
    headlineFontSize: 34,
    deckFontSize: 21,
    imageAlignment: "Left",
    imageThumbnail: true,
    widescreenCardsPerRow: 1,
    desktopCardsPerRow: 1,
    tabletCardsPerRow: 1,
    mobileCardsPerRow: 1,
    deckFont: "Arial"
  }
};
export const feedColorPaletteKeys = Object.keys(feedColorPalettes);
export const feedLayoutKeys = Object.keys(feedLayouts);
export const imageAlignmentValues = ["Left", "Right", "Vertical"];
export const maxContentItems = 12;
export const maxLinks = 12;
export const overlayTextElements = [
  "none",
  "Overline",
  "Headline",
  "Byline",
  "Deck",
  "Overline, Deck",
  "Overline, Byline",
  "Headline, Byline",
  "Overline, Headline, Byline",
  "PlayIcon"
];
export const sizes = ["small", "medium", "large", "extra large"];
export const textDecorations = [
  "bold",
  "bold, italic",
  "bold, centered, italic",
  "bold, centered, italic, uppercase",
  "centered",
  "centered, bold",
  "centered, italic",
  "centered, bold, uppercase",
  "centered, italic, uppercase",
  "centered, uppercase",
  "italic",
  "uppercase",
  "uppercase, bold",
  "uppercase, italic",
  "uppercase, bold, italic"
];
export const themes = ["default", "footer_stack", "overlay_button"];
export const titleBarTypes = ["accent", "ruler"];
export const fontSizeOptions = [
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  16,
  17,
  18,
  20,
  21,
  22,
  24,
  26,
  27,
  28,
  30,
  31,
  32,
  33,
  34,
  36,
  38,
  39,
  40,
  42,
  45,
  50,
  55,
  64,
  68
];
export const widths = [
  "20%",
  "25%",
  "30%",
  "40%",
  "50%",
  "60%",
  "70%",
  "80%",
  "90%",
  "100%"
];
export const styleProps = [
  "backgroundColor",
  "backgroundImage",
  "backgroundPosition",
  "backgroundRepeat",
  "backgroundSize",
  "border",
  "borderColor",
  "borderRadius",
  "borderWidth",
  "color",
  "cursor",
  "display",
  "float",
  "fontSize",
  "fontWeight",
  "height",
  "lineHeight",
  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "opacity",
  "padding",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "position",
  "textAlign",
  "textShadow",
  "textTransform",
  "width"
];
export const fontNames = {
  Arial: "font_default",
  Garamond: "font_primary",
  "Open Sans": "font_secondary",
  Helvetica: "font_tertiary",
  Franklin: "font_quaternary",
  Roboto: "font_quinary"
};

export const fontOptions = Object.keys(fontNames);

const getByline = (data, overrides) => {
  if (data && overrides) {
    return (
      <Byline
        bylineClasses={`${trim(
          `${overrides.bylineClasses} ${getTextClasses(
            overrides.bylineTextDecorations
          )}`
        )}`}
        bylineFont={fontNames[overrides.bylineFont]}
        overrides={overrides}
      />
    );
  }
};

const getDeck = (data, overrides) => {
  if (data && overrides) {
    const deckText =
      overrides.deckText ||
      (data && data.description && data.description.basic);
    return (
      <Deck
        deckClasses={`${trim(
          `${overrides.deckClasses} ${getTextClasses(
            overrides.deckTextDecorations
          )}`
        )}`}
        deckFont={fontNames[overrides.deckFont]}
        deckText={deckText}
        overrides={overrides}
      />
    );
  }
};

const getHeadline = (data, overrides) => {
  if (data && overrides) {
    const headlineOverride = overrides.headlineText;
    const headlineText =
      headlineOverride || (data && data.headlines && data.headlines.basic);
    return (
      <Headline
        headlineClasses={`${trim(
          `${overrides.headlineClasses} ${getTextClasses(
            overrides.headlineTextDecorations
          )}`
        )}`}
        headlinesContainerClasses={overrides.headlinesContainerClasses}
        headlineFont={fontNames[overrides.headlineFont]}
        headlineLevel={overrides.headlineLevel}
        headlineText={headlineText}
        overrides={overrides}
        subdheadlineClasses={overrides.subdheadlineClasses}
        subheadlineLevel={overrides.subheadlineLevel}
        subheadlineText={overrides.subheadlineText}
        url={overrides.url || (data && data.canonical_url)}
      />
    );
  }
};

const getOverline = (data, overrides) => {
  if (data && overrides) {
    const overlineText =
      overrides.overlineText ||
      (data &&
        data.taxonomy &&
        data.taxonomy.primary_section &&
        data.taxonomy.primary_section.name);
    return (
      <Overline
        overlineClasses={`${trim(
          `${overrides.overlineClasses} ${getTextClasses(
            overrides.overlineTextDecorations
          )}`
        )}`}
        overlineFontSize={overrides.overlineFontSize || defaultOverlineFontSize}
        overlineText={overlineText}
        overrides={overrides}
        url={overrides.url || (data && data.canonical_url)}
      />
    );
  }
};

const getLinks = (data, overrides) => {
  if (data && overrides) {
    return (
      <Links
        links={getWikipediaLinks(data.data)}
        linksBulletColor={overrides.linksBulletColor}
        linksClasses={`${trim(
          `${overrides.linksClasses} ${getTextClasses(
            overrides.linksTextDecorations
          )}`
        )}`}
        linksFontSize={overrides.linksFontSize}
        overrides={overrides}
      />
    );
  }
};

const getImage = (data, overrides) => {
  const overrideImageURL = overrides && overrides.imageURL;
  const textElements = overrides && overrides.overlayTextElements;
  const imageSrc =
    overrideImageURL ||
    (data &&
      data.promo_items &&
      data.promo_items.basic &&
      data.promo_items.basic.url);
  const getDisplayClass = (fromImage = false) => {
    const hasOverlay = overrides.overlayText || textElements;
    if (hasOverlay) {
      if (overrides.overlayHoverOnly) {
        return fromImage ? "display_hover" : "display_none";
      }
      return fromImage ? "" : "display_block";
    }
    return fromImage ? "" : "display_none";
  };
  const getOverlayLabelText = () => {
    if (textElements) {
      return (
        <Fragment>
          {textElements.split(",").map(element => {
            switch (trim(element)) {
              case "Overline":
                return getOverline(data, overrides);
              case "Headline":
                return getHeadline(data, overrides);
              case "Deck":
                return getDeck(data, overrides);
              case "Byline":
                return getByline(data, overrides);
              case "Links":
                return getLinks(data, overrides);
              case "PlayIcon":
                return <PlayIcon />;
              default:
                return null;
            }
          })}
        </Fragment>
      );
    }
    return <Fragment>{overrides.overlayText}</Fragment>;
  };
  const overlay = () => {
    if (overrides.overlayText || textElements) {
      const textPosition = elementPositions()[overrides.overlayTextPosition];
      const boxShadow = overrides.overlayBoxShadow ? "border_box_shadow" : "";
      return (
        <div
          className={`${trim(
            `overlay | absolute ${getDisplayClass()} height_full width_full`
          )}`}
          style={{
            backgroundColor: overrides && overrides.overlayBackgroundColor
          }}
        >
          <div
            className={`${trim(`label | absolute ${boxShadow} padding_2`)}`}
            style={{
              ...mapComponentPropsToStyles(overrides, "overlay"),
              ...mapComponentPropsToStyles(overrides, "overlayText"),
              ...textPosition
            }}
          >
            {getOverlayLabelText()}
          </div>
        </div>
      );
    }
    return null;
  };
  const alt =
    (overrides && overrides.url) ||
    (data &&
      data.promo_items &&
      data.promo_items.basic &&
      data.promo_items.basic.url);
  const height =
    (overrides && overrides.imageHeight) ||
    (data &&
      data.promo_items &&
      data.promo_items.basic &&
      data.promo_items.basic.height);
  const imageClasses = overrides && overrides.imageClasses;
  const width =
    (overrides && overrides.imageWidth) ||
    (data &&
      data.promo_items &&
      data.promo_items.basic &&
      data.promo_items.basic.width);
  return (
    <div className={trim(`image | ${getDisplayClass(true)} relative`)}>
      {overlay()}
      {overrides.imageLazyLoad ? (
        <LazyImage
          alt={alt}
          height={height}
          imageClasses={imageClasses}
          round={overrides.imageRound}
          src={imageSrc}
          width={width}
        />
      ) : (
        <Image
          alt={alt}
          height={height}
          imageClasses={imageClasses}
          round={overrides.imageRound}
          src={imageSrc}
          width={width}
        />
      )}
    </div>
  );
};

const storyCardComponents = (view, data, overrides) => {
  return {
    Byline: () => getByline(data, overrides),
    Deck: () => getDeck(data, overrides),
    Headline: () => getHeadline(data, overrides),
    Image: () => getImage(data, overrides),
    Links: () => getLinks(data, overrides),
    Overline: () =>
      view.indexOf("Overline") === -1
        ? getOverline(undefined, overrides)
        : getOverline(data, overrides)
  };
};

export const getCardContainerClassesFromView = (
  classes = "",
  viewName = ""
) => {
  return trim(`${classes} ${viewName}`);
};

export const getMarkupForViewName = (view, data, classes, overrides) => {
  const components = storyCardComponents(view, data, overrides);
  const viewComponents = view.split(",");
  return (
    <div
      className={getCardContainerClassesFromView(
        classes,
        view.replace(/ /g, "").replace(/,/g, "_")
      ).toLowerCase()}
      style={mapComponentPropsToStyles(overrides, "storyCard")}
    >
      {viewComponents.map((component, index) => {
        const componentName = component.split("-")[0].trim();
        return <Fragment key={index}>{components[componentName]()}</Fragment>;
      })}
    </div>
  );
};

// prettier-ignore
export const getStoryCardFromViewName = (data, classes, overrides) => {
  // ToDo: convert to [...arguments]
  return {
    'Headline': () => getMarkupForViewName('Headline', data, classes, overrides),
    'Headline, Byline': () => getMarkupForViewName('Headline, Byline', data, classes, overrides),
    'Headline, Deck': () => getMarkupForViewName('Headline, Deck', data, classes, overrides),
    'Headline, Deck, Byline': () => getMarkupForViewName('Headline, Deck, Byline', data, classes, overrides),
    'Headline, Deck, Links': () => getMarkupForViewName('Headline, Deck, Links', data, classes, overrides),
    'Headline, Deck, Byline, Links': () => getMarkupForViewName('Headline, Deck, Byline, Links', data, classes, overrides),
    'Headline, Byline, Image': () => getMarkupForViewName('Headline, Byline, Image', data, classes, overrides),
    'Headline, Image': () => getMarkupForViewName('Headline, Image', data, classes, overrides),
    'Headline, Image, Byline': () => getMarkupForViewName('Headline, Image, Byline', data, classes, overrides),
    'Headline, Image, Overline': () => getMarkupForViewName('Headline, Image, Overline', data, classes, overrides),
    'Headline, Image, Deck, Links': () => getMarkupForViewName('Headline, Image, Deck, Links', data, classes, overrides),
    'Headline, Deck, Image': () => getMarkupForViewName('Headline, Deck, Image', data, classes, overrides),
    'Headline, Deck, Image, Byline': () => getMarkupForViewName('Headline, Deck, Image, Byline', data, classes, overrides),
    'Headline, Image, Deck': () => getMarkupForViewName('Headline, Image, Deck', data, classes, overrides),
    'Deck': () => getMarkupForViewName('Deck', data, classes, overrides),
    'Deck, Image': () => getMarkupForViewName('Deck, Image', data, classes, overrides),
    'Image': () => getMarkupForViewName('Image', data, classes, overrides),
    'Image, Byline': () => getMarkupForViewName('Image, Byline', data, classes, overrides),
    'Image, Deck': () => getMarkupForViewName('Image, Deck', data, classes, overrides),
    'Image, Links': () => getMarkupForViewName('Image, Links', data, classes, overrides),
    'Image, Deck, Byline': () => getMarkupForViewName('Image, Deck, Byline', data, classes, overrides),
    'Image, Byline, Links': () => getMarkupForViewName('Image, Byline, Links', data, classes, overrides),
    'Image, Deck, Byline, Links': () => getMarkupForViewName('Image, Deck, Byline, Links', data, classes, overrides),
    'Image, Headline': () => getMarkupForViewName('Image, Headline', data, classes, overrides),
    'Image, Headline, Byline': () => getMarkupForViewName('Image, Headline, Byline', data, classes, overrides),
    'Image, Headline, Deck': () => getMarkupForViewName('Image, Headline, Deck', data, classes, overrides),
    'Image, Headline, Overline': () => getMarkupForViewName('Image, Headline, Overline', data, classes, overrides),
    'Image, Headline, Deck, Byline': () => getMarkupForViewName('Image, Headline, Deck, Byline', data, classes, overrides),
    'Image, Headline, Deck, Byline, Links': () => getMarkupForViewName('Image, Headline, Deck, Byline, Links', data, classes, overrides),
    'Image, Overline, Deck': () => getMarkupForViewName('Image, Overline, Deck', data, classes, overrides),
    'Image, Overline, Headline': () => getMarkupForViewName('Image, Overline, Headline', data, classes, overrides),
    'Image, Overline, Headline, Byline': () => getMarkupForViewName('Image, Overline, Headline, Byline', data, classes, overrides),
    'Image, Overline, Headline, Deck': () => getMarkupForViewName('Image, Overline, Headline, Deck', data, classes, overrides),
    'Image, Overline, Headline, Deck, Byline': () => getMarkupForViewName('Image, Overline, Headline, Deck, Byline', data, classes, overrides),
    'Image, Overline, Headline, Byline, Deck': () => getMarkupForViewName('Image, Overline, Headline, Byline, Deck', data, classes, overrides),
    'Image, Overline, Headline, Byline, Deck, Links': () => getMarkupForViewName('Image, Overline, Headline, Byline, Deck, Links', data, classes, overrides),
    'Overline, Deck': () => getMarkupForViewName('Overline, Deck', data, classes, overrides),
    'Overline, Deck, Image': () => getMarkupForViewName('Overline, Deck, Image', data, classes, overrides),
    'Overline, Headline': () => getMarkupForViewName('Overline, Headline', data, classes, overrides),
    'Overline, Headline, Image': () => getMarkupForViewName('Overline, Headline, Image', data, classes, overrides),
    'Overline, Headline, Deck': () => getMarkupForViewName('Overline, Headline, Deck', data, classes, overrides),
    'Overline, Headline, Deck, Byline': () => getMarkupForViewName('Overline, Headline, Deck, Byline', data, classes, overrides),
    'Overline, Headline, Deck, Image': () => getMarkupForViewName('Overline, Headline, Deck, Image', data, classes, overrides),
    'Overline, Headline, Image, Deck': () => getMarkupForViewName('Overline, Headline, Image, Deck', data, classes, overrides),
    'Overline, Headline, Deck, Byline, Links': () => getMarkupForViewName('Overline, Headline, Deck, Byline, Links', data, classes, overrides),
    'Overline, Headline, Deck, Image, Byline, Links': () => getMarkupForViewName('Overline, Headline, Deck, Image, Byline, Links', data, classes, overrides),
    'Overline, Headline, Image, Deck, Links': () => getMarkupForViewName('Overline, Headline, Image, Deck, Links', data, classes, overrides),
    'Overline, Image': () => getMarkupForViewName('Overline, Image', data, classes, overrides),
    'Overline, Image, Deck': () => getMarkupForViewName('Overline, Image, Deck', data, classes, overrides),
    'Overline, Image, Headline': () => getMarkupForViewName('Overline, Image, Headline', data, classes, overrides),
    'Overline, Image, Headline, Deck': () => getMarkupForViewName('Overline, Image, Headline, Deck', data, classes, overrides),
  }
};

export const getViewNames = (element, customViews) => {
  const defaultViews = Object.keys(getStoryCardFromViewName());
  if (customViews && element) {
    return customViews.map(view => {
      if (view.name.indexOf(element) >= 0) {
        return view.name;
      }
      return null;
    });
  }
  if (customViews) {
    return customViews.map(view => {
      return view.name;
    });
  }
  if (element) {
    return defaultViews.filter(key => {
      return key.indexOf(element) >= 0;
    });
  }
  return defaultViews;
};
