const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = (env, args) => {
  const config = {
    entry: {
      index: path.resolve("./src/index.tsx"),
    },
    output: {
      path: path.resolve("./dist"),
    },
    mode: "production",
    devtool: "hidden-source-map",
    target: "web",
    optimization: {},
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".css"],
      mainFields: ["browser", "module", "main"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },

        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: "[local]-[hash:base64:5]",
                }
              }
            },
          ],
        },
      ],
    },
    watchOptions: {
      aggregateTimeout: 100,
      ignored: /node_modules/,
      poll: 300,
    },
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin()],
		},
  };

  return config;
};
