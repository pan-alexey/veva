import { Configuration } from 'webpack';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';


export default (env: Record<string, string|boolean>):Configuration  => {
  const config: Configuration = {
    entry: {
      index: path.resolve("./src/index.tsx"),
    },
    output: {
      path: path.resolve("./dist"),
    },
    mode: "production",
    target: "web",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".css"],
      mainFields: ["browser", "module", "main"],
      alias: {
        '~': path.resolve('src'),
      },
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
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName:  env.WEBPACK_BUILD ? "hmr-[hash:base64:5]" : "[local]-[hash:base64:5]",
                },
              },
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
  };

  return config;
};