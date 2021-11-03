"use strict";

const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config();

module.exports = {
  entry: "./assets-src/app.jsx",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "assets"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./assets-src/index.template.html",
      templateParameters: {
        BRAND_NAME: process.env.BRAND_NAME,
      },
    }),
    new webpack.DefinePlugin({
      "process.env.BRAND_NAME": JSON.stringify(
        process.env.BRAND_NAME || "Bathroom renovation"
      ),
    }),
  ],
};
