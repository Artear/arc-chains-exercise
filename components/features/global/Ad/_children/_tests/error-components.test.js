/* React */
import React from "react";

/* Libraries */
import { shallow } from "enzyme";

/* Utilities */
import { PlaceholderAd, NoDFPIdSupplied } from "../error-components";

describe("Placeholder Ad", () => {
  const adInfo = {
    name: "Mock ad",
    dimensions: [300, 250],
    targeting: {
      pos: 1
    },
    slotName: "mock-name"
  };

  it("should render", () => {
    const instance = shallow(<PlaceholderAd adInfo={adInfo} />);

    expect(instance).toBeDefined();
  });

  it("should render an error message notifying user of missing dfp id", () => {
    const instance = shallow(<NoDFPIdSupplied />);
    expect(instance).toBeDefined();
  });
});
