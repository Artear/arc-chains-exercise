# Plugins

Full documentation [here](https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/api/feature-pack/resources/plugins.md).

## How plugins are structured within the Skeleton Repo

To enable fast creation of new plugins, we have included an example with a common webpack config you can use to make other plugins.

Example is here [wysiwyg-editor](./wysiwyg-editor) 

You will see that the [wysiwyg-editor's webpack config file](./wysisyg-editor/webpack.config.js) inherits from [common config](./common.config.js).

The Common Config does the following:

- Transpiles your ES6 code down so browsers can read it, using Babel.
- Extracts any CSS your plugin might need to operate.
- Outputs your built plugin into the [resources folder](./../resources/plugins) as an `index.html` and `plugin.js` file.

## How do I get my plugin to build?

If you make a change to your plugin, you will need to run `npm run build:plugins` to run the specified webpack process on all your plugins.

If you are developing on plugins, you will need to run `npm run watch:plugins` to trigger a watch process on them.

> Can I just put my plugin in the `resources/plugins` folder directly, as an `index.html` and a `plugin.js` file?

Yes. You could just write your plugins there directly, but they would need to be compiled code that any browser could read. This may work for very simple plugins, but in most cases you will want to use NPM modules with a webpack set up.
