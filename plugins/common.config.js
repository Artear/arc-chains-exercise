const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require("copy-webpack-plugin");

const commonConfig = (outputPath = ".") => {
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: "plugin.js"
    },
    devServer: {
      contentBase: outputPath,
      disableHostCheck: true
    },
    mode: "production",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }]
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          }
        }
      ]
    },
    plugins: [new CopyWebpackPlugin(["src/index.html"])]
  };
};

module.exports = commonConfig;
