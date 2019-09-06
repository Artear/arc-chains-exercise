import React from "react";
/**
 * Global mock for a fusion:context when running
 * unit tests of anything using a Content HOC.
 *
 * In order to use this mock you must do
 * `import Context from 'fusion:context';`
 * at the top of your unit test file, this will
 * trigger jest to mock the Content import below
 * */
jest.mock("fusion:context", renderProps => {
  const mContext = props => {
    const mockAvailableProps = {
      outputType: "default",
      ...renderProps
    };
    return props.children(mockAvailableProps);
  };
  return mContext;
});
