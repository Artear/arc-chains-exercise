/* eslint-disable import/no-cycle */
/* React */
import React from "react";
import { number } from "prop-types";

/* Libraries */
import Lazy from "lazy-child";

/* Components */
import Image from "../Image";

export default function LazyImage(props) {
  const { height: placeholderHeight, width: placeholderWidth } = props;
  return (
    <Lazy
      renderPlaceholder={ref => {
        return (
          <div
            ref={ref}
            style={{ height: placeholderHeight, width: placeholderWidth }}
          />
        );
      }}
    >
      <Image {...props} />
    </Lazy>
  );
}

LazyImage.propTypes = {
  height: number,
  width: number
};
