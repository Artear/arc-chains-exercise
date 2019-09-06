/* eslint-disable arrow-body-style */
const getTotalWordCount = elements =>
  elements.reduce((total, element) => {
    if (element.type === "text") {
      const count = element.content.split(" ").length;
      return total + count;
    }
    return total;
  }, 0);

export default getTotalWordCount;
