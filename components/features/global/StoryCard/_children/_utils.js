/* eslint-disable arrow-body-style */
/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

/* Utilities */
import { styleProps } from "./_configs";

/* Functions */
export const properCasePropKey = (key, component = "") => {
  // ex: headlineBorderColor
  const name = key.replace(component, "");
  return `${
    component === ""
      ? name.substr(0, 1).toUpperCase()
      : name.substr(0, 1).toLowerCase()
  }${name.substr(1, name.length - 1)}`;
};

export const getFontSize = (fontSize, responsiveText, responsiveTextScale) => {
  if (fontSize && responsiveText) {
    return `calc(${fontSize}px + ${responsiveTextScale}vw)`;
  }
  if (fontSize) {
    return `${fontSize}px`;
  }
  return "auto";
};

const getPropValue = prop => {
  const sizeProps = ["margin", "padding", "size", "width", "height"];
  sizeProps.map(sizeProp => {
    if (prop.indexOf(sizeProp) >= 0) {
      return `${prop}px`;
    }
  });
  return prop;
};

export const mapComponentPropsToStyles = (props, component) => {
  if (props && component) {
    const propKeys = Object.keys(props)
      .filter(key => {
        return styleProps.includes(properCasePropKey(key, component));
      })
      .reduce((obj, key) => {
        const name = properCasePropKey(key, component);
        obj[name] = // eslint-disable-line no-param-reassign
          // add check for "font", translate to "font-family"
          name === "fontSize"
            ? getFontSize(
                props[key],
                props.responsiveText,
                props.responsiveTextScale
              )
            : props[getPropValue(key)];
        return obj;
      }, {});
    return propKeys;
  }
};

export const trim = text => {
  return text.replace(/\s\s+/g, " ").trim();
};

export const getTextClasses = textDecorationValue => {
  if (textDecorationValue) {
    return trim(
      textDecorationValue
        .toString()
        .replace("centered", "text_align_center")
        .replace(/,/gi, " ")
    );
  }
  return null;
};

export const getBorderClasses = border => {
  let classes = border ? "border_1" : "";
  if (border) {
    border.split(",").map(value => {
      classes = classes.concat(` border_${trim(value)}`);
    });
  }
  return classes;
};

export const getCenterTextClass = centerText =>
  centerText ? "text_align_center" : "";

const isEven = n => {
  // eslint-disable-next-line eqeqeq
  return n == parseFloat(n) ? !(n % 2) : undefined;
};

export const getColumnSizeClasses = (
  widescreenValues,
  desktopValues,
  tabletValues,
  mobileValues,
  isCardsPerRow
) => {
  const getColumnsValue = columns => {
    if (isCardsPerRow) {
      return isEven(columns)
        ? parseInt(12 / widescreenValues, 10)
        : (12 / columns).toString().replace(".", "_");
    }
    return columns;
  };
  const widescreenColumns = getColumnsValue(widescreenValues);
  const desktopColumns = getColumnsValue(desktopValues);
  const tabletColumns = getColumnsValue(tabletValues);
  const mobileColumns = getColumnsValue(mobileValues);
  const sizeClasses =
    widescreenColumns || desktopColumns || tabletColumns || mobileColumns
      ? `col${widescreenColumns ? ` widescreen-${widescreenColumns}` : ""}
      ${desktopColumns ? ` desktop-${desktopColumns}` : ""}
      ${tabletColumns ? ` tablet-${tabletColumns}` : ""}
      ${mobileColumns ? ` mobile-${mobileColumns}` : ""}`
      : "";
  return trim(sizeClasses);
};

export const countUpperCaseChars = string => {
  return string.substr(1, string.length - 1).replace(/[^A-Z]/g, "").length;
};

export const getImageAlignmentClasses = (imageAlignment, view) => {
  return view && imageAlignment && view.indexOf("Image") >= 0
    ? `image${imageAlignment}`
    : "";
};

export const stripBadAttributes = element => {
  if (typeof element === "string") {
    const newElement = element
      .replace(/target="[^"]*"/g, "")
      .replace(/style="[^"]*"/g, "")
      .replace(/style='[^']*'/g, "")
      .replace(/onclick="[^"]*"/g, "")
      .replace(/type="[^"]*"/g, "")
      .replace(/shape="[^"]*"/g, "")
      .replace(/align="[^"]*"/g, "");
    return newElement;
  }
  return element;
};

export const getThemeFromCustomFields = customFields => {
  const theme = { colors: {}, layout: {} };
  const keys = Object.keys(customFields);
  keys.map(key => {
    const customField = customFields[key];
    if (
      typeof customField === "string" ||
      typeof customField === "number" ||
      typeof customField === "boolean"
    ) {
      const value = customField.valueOf();
      if (
        (value &&
          value !== "" &&
          typeof value !== "object" &&
          typeof value !== "function") ||
        typeof value === "number"
      ) {
        theme[key.indexOf("Color") >= 0 ? "colors" : "layout"][key] = value;
      }
    }
  });
  return theme;
};
