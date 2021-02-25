import webpack from 'webpack';
import * as $$path from '../utils/path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import nodeExternals from 'webpack-node-externals';
import { types } from 'util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  resolve: {
    alias: {
      '@src': $$path.resolvePath('./src')
    },
    extensions: ['.scss', '.js', 'jsx', '.ts', '.tsx']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name(module: any) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor/${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
};

export interface IConfig {
  input: string;
  output: string;
  isProd: boolean;
  isServer: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const configBuilder = (props: IConfig): Object => {
  const { input, output, isProd = false, isServer } = props;

  config.devtool = isProd ? false : 'source-map';
  config.mode = isProd ? 'production' : 'development';
  config.entry = input; // isProd && !isServer ? input : ['webpack-hot-middleware/client', input];

  if (isServer) {
    config.target = 'node';
    config.externals = [nodeExternals()];
  }

  config.output = {
    path: output,
    filename: 'index.js',
    chunkFilename: 'js/[name].[contenthash:8].js',
    libraryTarget: 'umd'
  };

  config.plugins = [
    ...config.plugins,
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: isServer ? 1 : Infinity })
  ];

  config.module = {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-object-rest-spread']
            }
          },
          { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }
        ]
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              onlyLocals: Boolean(isServer),
              modules: {
                auto: /\.module\.\w+$/i,
                exportGlobals: true,
                localIdentName: isProd ? '[hash:base64:6]' : '[local]__[hash:base64:6]',
                hashPrefix: 'veva'
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  };

  return config;
};

export default configBuilder;
