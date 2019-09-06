/**
 * Global mock for a fusion:feature-props when you
 * need to test site properties.
 *
 * In order to use this mock you must do
 * `import FeatureProps from 'fusion:feature-props';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Feature Props import below
 * */

const FeatureProps = {
  globalContent: {},
  contextPath: "/pf",
  siteProperties: {
    siteName: "mock",
    dfp_id: 123
  }
};

export default FeatureProps;
