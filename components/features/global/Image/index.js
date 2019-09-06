/* eslint-disable import/no-cycle */
/* eslint-disable arrow-body-style */
/* React */
import React, { Fragment } from "react";
import PropTypes from "prop-types";

/* Configs */
import { trim } from "../StoryCard/_children/_utils";

const Image = props => {
  const {
    caption = "",
    captionClasses,
    containerClasses,
    credits = {},
    creditsClasses,
    creditsSeparator = "|",
    height,
    imageClasses,
    ImageTag = "img",
    placeholderImage,
    resizedUrls,
    round,
    showCredits = true,
    sizePreset,
    url,
    width
  } = props;

  let src = placeholderImage || props.src;

  const byCredits =
    (credits.by &&
      credits.by.map(credit => credit.byline).join(`${creditsSeparator}`)) ||
    "";

  const affiliationCredits =
    (credits.affiliation &&
      credits.affiliation
        .map(credit => credit.name)
        .join(`${creditsSeparator}`)) ||
    "";

  const creditString =
    showCredits &&
    `${byCredits}${byCredits &&
      affiliationCredits &&
      ` ${creditsSeparator} `}${affiliationCredits}`;

  const includeCaption = caption || creditString;

  if (sizePreset) {
    if (!resizedUrls) {
      // eslint-disable-next-line
      console.error("Image: aspectRatio provided but no resized_urls.");
    } else {
      const resizeUrl = resizedUrls[sizePreset];

      if (!resizeUrl) {
        // eslint-disable-next-line
        console.error(`Image: unknown aspectRatio "${sizePreset}".`);
      } else {
        src = resizeUrl;
      }
    }
  }

  const imgProps = {
    alt: caption,
    height,
    [ImageTag === "amp-img" ? "class" : "className"]: imageClasses,
    src,
    width
  };

  const ampProps = { ...imgProps };

  const image = () => {
    const imgClasses = `${trim(
      `${imageClasses} ${round ? "border_round" : ""}`
    )}`;
    return (
      <Fragment>
        {ImageTag === "amp-img" ? (
          <ImageTag class={imgClasses} {...ampProps} />
        ) : (
          <ImageTag class={imgClasses} {...imgProps} />
        )}
        {includeCaption && (
          <figcaption className={captionClasses}>
            {caption}
            {creditString && (
              <span className={creditsClasses}>{creditString}</span>
            )}
          </figcaption>
        )}
      </Fragment>
    );
  };

  return (
    <figure className={containerClasses}>
      {url ? (
        <a href={url} className="color_inherit">
          {image()}
        </a>
      ) : (
        image()
      )}
    </figure>
  );
};

// height and width are required because of amp.
Image.propTypes = {
  caption: PropTypes.string,
  captionClasses: PropTypes.string,
  containerClasses: PropTypes.string,
  credits: PropTypes.shape({
    affiliation: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ),
    by: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    )
  }),
  creditsClasses: PropTypes.string,
  creditsSeparator: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imageClasses: PropTypes.string,
  ImageTag: PropTypes.oneOf(["img", "amp-img"]),
  layout: PropTypes.string,
  placeholderImage: PropTypes.string,
  resizedUrls: PropTypes.object,
  round: PropTypes.bool,
  showCredits: PropTypes.bool,
  sizePreset: PropTypes.string,
  src: PropTypes.string.isRequired,
  url: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Image;

export const AmpImage = props => {
  return <Image {...props} ImageTag="amp-img" />;
};
