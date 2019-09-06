/* eslint-disable */
//import Thumbor from 'thumbor';

function focusImage(focalPoint, thumborInstance) {
  const [x, y] = focalPoint;
  // left, top, right, bottom
  const rect = [x - 5, y + 5, x + 5, y - 5];
  const focalFilter = `focal(${rect[0]}x${rect[1]}:${rect[2]}x${rect[3]})`;
  return thumborInstance.filter(focalFilter);
}

const ImageFormat = ({
  height,
  heightAspect = null,
  smart = false,
  src,
  width,
  focalPoint = null,
  fitIn = null
}) => {
  if (!src) return src;

  // TODO: once the Fusion environment API is set up, encrypt these creds
  const thumbor = []; //new Thumbor();

  thumbor.smartCrop(false);
  thumbor.fitInFlag = false;

  // get image url from the tag variable and remove the http/https
  let imgSrc = src.replace(/^http[s]?:\/\//, "").replace(" ", "%20");

  if (imgSrc.includes("?")) imgSrc.replace("?", "%3F");

  // Set the image dimensions
  let imgWidth = 1440;
  let imgHeight = 0;

  if (width || height) {
    imgWidth = width || (heightAspect ? Math.floor(height / heightAspect) : 0);
    imgHeight = height || (heightAspect ? Math.floor(width * heightAspect) : 0);
  } else if (heightAspect) {
    imgHeight = Math.floor(imgWidth * heightAspect);
  }

  if (smart && !focalPoint) {
    thumbor.smartCrop(true);
  } else if (
    focalPoint &&
    focalPoint.length == 2 &&
    imgWidth !== 0 &&
    imgHeight !== 0 &&
    thumbor.filtersCalls &&
    thumbor.filtersCalls.length == 0
  ) {
    focusImage(focalPoint, thumbor);
  }

  if (fitIn && imgWidth !== 0 && imgHeight !== 0) {
    thumbor.fitInFlag = true;
    thumbor.width = imgWidth;
  } else {
    thumbor.resize(imgWidth, imgHeight);
  }

  return thumbor.setImagePath(imgSrc).buildUrl();
};

export default ImageFormat;
