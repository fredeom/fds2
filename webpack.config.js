const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '/fonts/'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit1.html',
      template: './src/uikit1.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit2.html',
      template: './src/form_elements.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit3.html',
      template: './src/cards.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit4.html',
      template: './src/headers_and_footers.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'website_landing.html',
      template: './src/landing.pug',
    }),
 ]
};
module.exports = config;