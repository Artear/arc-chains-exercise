export const defaultAdType = {
  name: "Cube",
  slotName: "homepage",
  display: "all",
  dimensions: [[300, 250]],
  targeting: {
    pos: 1
  }
};

export const adTypes = [
  defaultAdType,
  {
    name: "Leaderboard",
    slotName: "homepage",
    display: "all",
    dimensions: [[728, 90]],
    targeting: {
      pos: 2
    },
    wrapperClasses: "flex flex--justify-center"
  }
];

/**
 * Given an array of ad types, return a list of all the ad names
 *
 * @param {Array} types an array of adTypes
 * @return {Array} a list of adTypes.name values
 * */
export const adTypeOptions = types => {
  const result = [];
  Object.keys(types).forEach(index => {
    return result.push(types[index].name);
  });
  return result;
};
