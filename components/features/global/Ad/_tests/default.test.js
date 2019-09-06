/* React */
import React from "react";

/* Fusion */
import Consumer from "fusion:consumer";

/* Utilities */
import { shallow } from "enzyme";

/* Components */
import ArcAdCC from "@arc-core-components/feature_ads-arc-ad";
import ArcAd from "../default.jsx";
import { NoDFPIdSupplied, PlaceholderAd } from "../_children/error-components";

describe("<ArcAd>", () => {
  let props;

  beforeEach(() => {
    props = {
      customFields: {
        slot: "",
        display: "all",
        type: "Cube",
        refresh: true
      },
      siteProperties: {
        dfp_id: 123,
        adBreakpoints: ""
      }
    };
  });

  describe("admin behavior", () => {
    beforeEach(() => {
      props.isAdmin = true;
    });

    it("should render placeholder", () => {
      const instance = shallow(<ArcAd {...props} />);
      expect(instance).toBeDefined();

      const placeholder = instance.find(PlaceholderAd);
      expect(placeholder).toHaveLength(1);

      const adCoreComponent = instance.find(ArcAdCC);
      expect(adCoreComponent).toHaveLength(0);

      const dfpIdError = instance.find(NoDFPIdSupplied);
      expect(dfpIdError).toHaveLength(0);
    });

    it("should warn admin if no DFP ID is supplied", () => {
      props.siteProperties.dfp_id = null;
      const instance = shallow(<ArcAd {...props} />);
      expect(instance).toBeDefined();

      const placeholder = instance.find(PlaceholderAd);
      expect(placeholder).toHaveLength(0);

      const adCoreComponent = instance.find(ArcAdCC);
      expect(adCoreComponent).toHaveLength(0);

      const dfpIdError = instance.find(NoDFPIdSupplied);
      expect(dfpIdError).toHaveLength(1);
    });
  });

  describe("ads behavior", () => {
    beforeEach(() => {
      props.isAdmin = false;
    });

    it("should not render an arc ad without DFP ID", () => {
      props.siteProperties.dfp_id = null;
      const instance = shallow(<ArcAd {...props} />);

      const adCoreComponent = instance.find(ArcAdCC);
      expect(adCoreComponent).toHaveLength(0);

      const placeholder = instance.find(PlaceholderAd);
      expect(placeholder).toHaveLength(0);

      const dfpIdError = instance.find(NoDFPIdSupplied);
      expect(dfpIdError).toHaveLength(0);
    });

    /* Removing Ad test until have actual DFP id */
    // it("should render an ad", () => {
    //   const instance = shallow(<ArcAd {...props} />);

    //   const adCoreComponent = instance.find(ArcAdCC);
    //   expect(adCoreComponent).toHaveLength(1);
    // });

    it("should handle no ad types gracefully", () => {
      props.customFields.type = null;
      const instance = shallow(<ArcAd {...props} />);

      const adCoreComponent = instance.find(ArcAdCC);
      expect(adCoreComponent).toHaveLength(0);
    });
  });
});
