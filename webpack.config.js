const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require ('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  entry: {
    home: './src/js/main.js',
    print: './src/print.js',
   },

  devServer:{
    contentBase: './dist',
    port: 3001,
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {from:'src/images',to:'./images'}
    ]),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Home',
      template: './src/index.html',
      filename: './index.html',
      inject: true,
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'About',
      template: './src/about.html',
      filename: './about.html',
      inject: true,
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Work',
      template: './src/work.html',
      filename: './work.html',
      inject: true,
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Contact',
      template: './src/contact.html',
      filename: './contact.html',
      inject: true,
      chunks: ['home']
    }),
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules:[

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
              options: {
                plugins: function () { // postcss plugins, can be exported to postcss.config.js
                  return [
                    precss,
                    autoprefixer,
                  ];
                }
              }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },

      {
       test: /\.css$/,
       use: [
         'style-loader',
         'css-loader',
       ],
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: [
         'file-loader',
       ],
      },
      {
       test: /\.(woff|woff2|eot|ttf|otf)$/,
       use: [
         'file-loader',
       ],
      },
      {
       test: /\.(csv|tsv)$/,
       use: [
         'csv-loader',
       ],
      },
      {
       test: /\.xml$/,
       use: [
         'xml-loader',
       ],
      },
     ],
  },
};
