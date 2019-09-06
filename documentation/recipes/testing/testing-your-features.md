# Testing your features

The Skeleton Repo uses **Jest** and **Enzyme**to ensure complete test coverage.

Here's what you need to know about test setup before writing your own tests:

- Jest configuration is set near the bottom of the `package.json` file.

- The `setupTests.js` file, at the root of your repo, is where Enzyme Adapter configuration information lives.

- A `__mocks__` folder contains any Fusion or PageBuilder admin specific mocks, which will make writing your tests as straightforward as possible.

- It is suggested to include your tests as close to your original js files as possible, using a format of `[feature-name].test.js`. You can take a look at the `components/feature/sample/masthead` directory for an example.

- Your tests can be run with `npm test`. This will also generate a `.gitignore`-d `coverage` folder.

Next: [Adding an AMP Output Type](./../amp/adding-an-amp-output-type.md)
