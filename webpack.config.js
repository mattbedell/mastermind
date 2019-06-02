const { resolve, join } = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const APP_ENTRY = resolve('src', 'index.jsx');
const HTML_TEMPLATE_ENTRY = resolve('src', 'index.html');
const EMIT_DIR = resolve('dist');

const getEnv = (envKeys = []) => envKeys.reduce((env, key) => {
  console.log(process.env[key]);
  env[`process.env.${key}`] = `'${process.env[key]}'`;
  return env;
}, {});

const config = {
  entry: {
    app: APP_ENTRY,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: [
          { loader: 'babel-loader'},
          // { loader: 'eslint-loader'},
        ],
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { watch: true }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      ...getEnv([
        'SOCK_HOST',
        'SOCK_PATH',
      ]),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].[hash].js',
    path: EMIT_DIR,
    publicPath: '/',
  },
  devServer: {
    contentBase: EMIT_DIR,
    disableHostCheck: true,
    hot: true,
  },
}

module.exports = (env, argv) => {
  // modify build config based off args, mode
  return config;
}
