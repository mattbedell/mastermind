const { resolve, join } = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const APP_ENTRY = resolve('src', 'index.js');
const HTML_TEMPLATE_ENTRY = resolve('src', 'index.html');
const EMIT_DIR = resolve('dist');

const config = {
  entry: {
    app: APP_ENTRY,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader'},
          { loader: 'eslint-loader'},
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { watch: true }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })
  ],
  output: {
    filename: '[name].[hash].js',
    path: EMIT_DIR,
    publicPath: '/dist/',
  },
}

module.exports = (env, argv) => {
  // modify build config based off args, mode
  return config;
}
