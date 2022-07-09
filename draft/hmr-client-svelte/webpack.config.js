const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const SvelteCheckPlugin = require("svelte-check-plugin");

const mode = process.env.NODE_ENV || "development";

const prod = mode === "production";

const rootPath = process.cwd();
const srcPath = path.join(rootPath, "./src");
const outputPath = path.join(rootPath, "/public");

module.exports = {
  mode,
  entry: {
    index: ["./src/main.ts"],
  },
  mode: "production",
  devtool: "hidden-source-map",
  target: "web",
  resolve: {
    alias: {
      "~": srcPath,
    },
    extensions: [".mjs", ".js", ".ts", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: outputPath,
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: [
          {
            loader: "svelte-loader",
            options: {
              onwarn(warning, onwarn) {
                return (
                  warning.code === "css-unused-selector" || onwarn(warning)
                );
              },
              compilerOptions: {
                dev: false,
              },
              hotReload: false,
              preprocess: require("svelte-preprocess")({
                css: true,
                scss: true,
                sass: true,
              }),
            },
          },
          {
            loader: "svelte-cssmodules-loader",
            options: {
              localIdentName: "[local]-hmr-[hash:base64:6]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SvelteCheckPlugin(),
  ],
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/,
    poll: 300
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
