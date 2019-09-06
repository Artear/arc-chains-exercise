/* eslint-disable array-callback-return */
/* React */
import PropTypes from "prop-types";

/* Configs */
import {
  directionValues,
  elementPositionValues,
  fontOptions,
  fontSizeOptions,
  imageAlignmentValues,
  maxContentItems,
  overlayTextElements,
  textDecorations,
  themes,
  titleBarTypes,
  widths
} from "./_configs";

/* Utilities */
import { countUpperCaseChars, properCasePropKey, trim } from "./_utils";

export const spacerProps = (element = "", type, elementAsGroup = false) => {
  const group = { group: elementAsGroup ? element : type };
  const elementPrefix =
    countUpperCaseChars(element) >= 1 ? element : element.toLowerCase();
  const spacers = {};
  for (let i = 1; i <= directionValues.length - 1; i += 1) {
    const direction = `${directionValues[i]}`;
    const value = PropTypes.number.tag({
      name: `${type} ${direction}`,
      ...group,
      min: -50,
      max: 100,
      step: 1
    });
    spacers[
      `${elementPrefix}${type}${properCasePropKey(directionValues[i])}`
    ] = value;
  }
  return spacers;
};

export const textDecorationProps = group => {
  return {
    textDecoration: PropTypes.oneOf(textDecorations).tag({
      group,
      name: "Text Decoration"
    })
  };
};

export const textProps = (group = "Feed") => {
  return {
    ...textDecorationProps(group),
    responsiveText: PropTypes.bool.tag({
      defaultValue: false,
      name: "Responsive Text",
      group
    }),
    responsiveTextScale: PropTypes.number.tag({
      defaultValue: 0.9,
      group,
      min: 0.1,
      max: 3,
      step: 0.1,
      name: "Responsive Text Scale"
    })
  };
};

export const textElementProps = (
  element,
  group,
  includeText = true,
  includeResponsive = false
) => {
  const elementResponsiveTextProps = {
    [`${element}ResponsiveText`]: PropTypes.bool.tag({
      defaultValue: false,
      name: "Responsive Text",
      group
    }),
    [`${element}ResponsiveTextScale`]: PropTypes.number.tag({
      defaultValue: 0.9,
      group,
      min: 0.1,
      max: 3,
      step: 0.1,
      name: "Responsive Text Scale"
    })
  };
  const elementTextProp = {
    [`${element}Text`]: PropTypes.string.tag({
      group,
      name: "Text"
    })
  };
  const elementStyleProps = {
    [`${element}BackgroundColor`]: PropTypes.string.tag({
      group,
      name: "Background Color"
    }),
    [`${element}BorderColor`]: PropTypes.string.tag({
      group,
      name: "Border Color"
    }),
    [`${element}Color`]: PropTypes.string.tag({
      group,
      name: "Color"
    }),
    [`${element}Font`]: PropTypes.oneOf(fontOptions).tag({
      group,
      name: "Font"
    }),
    [`${element}FontSize`]: PropTypes.oneOf(fontSizeOptions).tag({
      group,
      name: "Font Size"
    }),
    [`${element}TextDecorations`]: PropTypes.oneOf(textDecorations).tag({
      group,
      name: "Text Decoration(s)"
    })
  };
  if (includeResponsive && includeText) {
    return {
      ...elementTextProp,
      ...elementStyleProps,
      ...elementResponsiveTextProps
    };
  }
  if (includeResponsive) {
    return {
      ...elementStyleProps,
      ...elementResponsiveTextProps
    };
  }
  if (includeText) {
    return {
      ...elementTextProp,
      ...elementResponsiveTextProps
    };
  }
  return elementStyleProps;
};

export const imageProps = {
  imageAlignment: PropTypes.oneOf(imageAlignmentValues).tag({
    defaultValue: "Vertical",
    group: "Image",
    name: "Alignment"
  }),
  imageLazyLoad: PropTypes.bool.tag({
    defaultValue: false,
    group: "Image",
    name: "Lazy Load"
  }),
  imageRound: PropTypes.bool.tag({
    defaultValue: false,
    group: "Image",
    name: "Round Image"
  }),
  imageThumbnail: PropTypes.bool.tag({
    defaultValue: false,
    group: "Image",
    name: "Thumbnail (L/R only)"
  })
};

export const imageURLProp = {
  imageURL: PropTypes.string.tag({
    defaultValue: false,
    group: "Image",
    name: "URL"
  })
};

export const labelProps = (
  group = "Label",
  includePosition = false,
  namespace = ""
) => {
  const labelTextProps = {
    [`${namespace}Text`]: PropTypes.string.tag({
      group,
      name: "Text"
    }),
    [`${namespace}TextBackgroundColor`]: PropTypes.string.tag({
      group,
      name: "Text Background Color"
    }),
    [`${namespace}TextColor`]: PropTypes.string.tag({
      defaultValue: "white",
      group,
      name: "Text Color"
    }),
    [`${namespace}TextFontSize`]: PropTypes.oneOf(fontSizeOptions).tag({
      group,
      name: "Text Font Size"
    })
  };
  const positionProp = {
    [`${namespace}TextPosition`]: PropTypes.oneOf(elementPositionValues).tag({
      group,
      name: "Text Position"
    })
  };
  return includePosition
    ? {
        ...labelTextProps,
        ...positionProp
      }
    : labelTextProps;
};

export const overlayProps = (group = "Overlay") => {
  return {
    ...labelProps(group, true, "overlay"),
    overlayHoverOnly: PropTypes.bool.tag({
      group,
      defaultValue: true,
      name: "On Hover"
    }),
    overlayBackgroundColor: PropTypes.string.tag({
      group,
      name: "Background Color"
    }),
    overlayBoxShadow: PropTypes.bool.tag({
      group,
      defaultValue: false,
      name: "Box Shadow"
    }),
    overlayTextElements: PropTypes.oneOf(overlayTextElements).tag({
      group,
      name: "Overlay Element(s)"
    }),
    overlayTextWidth: PropTypes.oneOf(widths).tag({
      group,
      name: "Width"
    }),
    ...spacerProps(group, "Margin", true)
  };
};

export const titleBarProps = (group = "Title") => {
  return {
    title: PropTypes.string.tag({
      group,
      name: "Title"
    }),
    titleBorderColor: PropTypes.string.tag({
      group,
      name: "Border Color"
    }),
    titleBarBackgroundColor: PropTypes.string.tag({
      group,
      name: "Background Color"
    }),
    titleBarColor: PropTypes.string.tag({
      group,
      name: "Color"
    }),
    titleBarFont: PropTypes.oneOf(fontOptions).tag({
      group,
      name: "Font"
    }),
    titleBarFontSize: PropTypes.oneOf(fontSizeOptions).tag({
      group,
      name: "Font Size"
    }),
    titleBarType: PropTypes.oneOf(titleBarTypes).tag({
      group,
      defaultValue: titleBarTypes[0],
      name: "Type"
    })
  };
};

export const createCuratedPropsByElement = (
  element,
  elementProp = "",
  type,
  typeArgs
) => {
  const views = {};
  for (let i = 1; i <= maxContentItems; i += 1) {
    const textKey = trim(`${element.toLowerCase()}${elementProp}${i}`);
    const PropType =
      type === "bool" ? PropTypes.bool : PropTypes.oneOf(typeArgs);
    const value = PropType.tag({
      group: trim(
        `Curated ${element}${elementProp ? ` ${elementProp}s` : "s"}`
      ),
      name: textKey
    });
    views[textKey] = value;
  }
  return views;
};

export const getThemeProps = (group = "Card") => {
  return {
    theme: PropTypes.oneOf(themes).tag({
      group,
      name: "Theme"
    })
  };
};

const getColumnProps = (deviceName, groupName = "Columns", name) => {
  return {
    name: deviceName,
    group: name || groupName,
    max: 12,
    min: 1,
    step: 1
  };
};

export const columnsProps = (groupName = "Columns", name) => {
  return {
    [`widescreen${groupName}`]: PropTypes.number.tag(
      getColumnProps("Widescreen", groupName, name)
    ),
    [`desktop${groupName}`]: PropTypes.number.tag(
      getColumnProps("Desktop", groupName, name)
    ),
    [`tablet${groupName}`]: PropTypes.number.tag(
      getColumnProps("Tablet", groupName, name)
    ),
    [`mobile${groupName}`]: PropTypes.number.tag(
      getColumnProps("Mobile", groupName, name)
    )
  };
};

export const cardsPerRowProps = () => {
  const props = {};
  const cards = [1, 2, 3, 4, 5, 6];
  const devices = ["widescreen", "desktop", "tablet", "mobile"];

  devices.map(device => {
    props[`${device}CardsPerRow`] = PropTypes.oneOf(cards).tag({
      defaultValue: 1,
      group: "Cards per Row",
      name: properCasePropKey(device)
    });
  });
  return props;
};
