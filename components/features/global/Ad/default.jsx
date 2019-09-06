/* React */
import React, { Component } from "react";
import PropTypes from "fusion:prop-types";

/* Fusion */
import Consumer from "fusion:consumer";

/* Components */
import { CCArcAd } from "@arc-core-components/feature_ads-arc-ad";

/* Utilities */
import { adTypes, adTypeOptions, defaultAdType } from "./_children/adtypes";
import { NoDFPIdSupplied, PlaceholderAd } from "./_children/error-components";

@Consumer
class ArcAd extends Component {
  render() {
    const {
      slot,
      type,
      display,
      refresh,
      wrapperClasses
    } = this.props.customFields;

    const { siteProperties } = this.props;
    const { dfp_id: dfpid, adBreakpoints } = siteProperties;
    const { isAdmin, isAmp = false } = this.props;

    // If there is no DFP ID and we are in the Admin,
    if (!dfpid && isAdmin) return <NoDFPIdSupplied />;

    // If no DFP ad is supplied and we are not in the admin, render nothing.
    if (!dfpid && !isAdmin) return null;

    // get the data for this particular ad type
    const adType = type
      ? adTypes.filter(ad => {
          return ad.name === type;
        })[0]
      : {};

    // text added above the advertisement
    const adTextClasses =
      "font--secondary text--uppercase box--margin-bottom-lg box--margin-top-lg";
    const adText = "Advertisement";
    const advertisementText = <div className={adTextClasses}>{adText}</div>;

    // toggle display of this ad according to custom fields
    const desktopClasses = display === "desktop" ? "hidden-mobile" : "";
    const mobileClasses =
      display === "mobile" ? "hidden-tablet hidden-desktop" : "";

    // what to display if there is no ad
    const fallbackAd = "";

    // use their slotname if given, otherwise default to the slotname for this ad type
    const slotName = slot || adType.slotName;

    // If we are in the admin, return a placeholder ad slot
    if (dfpid && isAdmin) return <PlaceholderAd slot={slot} adInfo={adType} />;

    const arcad = (
      <CCArcAd
        id={slotName}
        dfpId={dfpid}
        childrenPosition="top"
        className={`dfpAd ${desktopClasses} ${mobileClasses} ${wrapperClasses} text--center`}
        slotName={slotName}
        dimensions={adType.dimensions}
        display={display}
        breakpoints={adBreakpoints}
        refresh={refresh}
        adType={type}
        targeting={adType.targeting}
        isAmp={isAmp}
      >
        {advertisementText}
      </CCArcAd>
    );

    return slotName ? arcad : fallbackAd;
  }
}

ArcAd.propTypes = {
  siteProperties: PropTypes.shape({
    dfp_id: PropTypes.number,
    adBreakpoints: PropTypes.string
  }),
  isAdmin: PropTypes.bool,
  isAmp: PropTypes.bool,
  customFields: PropTypes.shape({
    slot: PropTypes.string.tag({
      defaultValue: defaultAdType.slotName || ""
    }),
    display: PropTypes.oneOf(["mobile", "desktop", "all"]).tag({
      defaultValue: "all"
    }),
    type: PropTypes.oneOf(adTypeOptions(adTypes)).tag({
      defaultValue: defaultAdType.name
    }),
    refresh: PropTypes.bool,
    wrapperClasses: PropTypes.string
  })
};

export default ArcAd;
