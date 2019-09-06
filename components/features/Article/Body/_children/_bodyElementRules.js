/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* React */
import React from "react";

/* Components */
import ArcAd from "../../../global/Ad/default";

/* Utilities */
import { defaultAdType } from "../../../global/Ad/_children/adtypes";
import bodyElements from "./_bodyElements";
import getTotalWordCount from "../../../../utilities/Text";
import getParameterByName from "../../../../utilities/Browser";

const getElementWordCount = (textElement, runningWordCount) => (
  <span className="word_count | color_gray">
    {`Word Count: (${
      textElement.content.split(" ").length
    } / ${runningWordCount})`}
  </span>
);

/* ToDo: Move logic to content source transform (performance) */
const determineElementsToRender = (elements, siteProperties, props) => {
  const output = [];
  if (elements) {
    const {
      afterWordCount,
      numberOfAds,
      minimumWordCount,
      showWordCount
    } = props.customFields;
    const totalWordCount = getTotalWordCount(elements);
    let adCount = 0;
    let runningWordCount = 0;
    let previousElementType;

    elements.forEach((element, i) => {
      const elementType = element.type;

      output.push({
        type: elementType,
        element: bodyElements(element)
      });

      /* if is a paragraph, increment word count */
      if (elementType === "text") {
        runningWordCount += element.content.split(" ").length;
        if (showWordCount || getParameterByName("showWordCount") === "true") {
          output.push({
            type: elementType,
            element: getElementWordCount(element, runningWordCount, props)
          });
        }
      }

      if (
        numberOfAds &&
        afterWordCount &&
        minimumWordCount &&
        i > 1 &&
        adCount <= numberOfAds - 1 &&
        runningWordCount >= afterWordCount &&
        totalWordCount >= minimumWordCount &&
        previousElementType !== "ad"
      ) {
        output.push({
          type: "ad",
          element: (
            <ArcAd
              customFields={defaultAdType}
              siteProperties={siteProperties}
            />
          )
        });
        adCount += 1;
        previousElementType = "ad";
      } else {
        previousElementType = elementType;
      }
    });
  }
  return output;
};

export default determineElementsToRender;
