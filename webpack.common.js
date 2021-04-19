const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const pages = require("./src/data/pages.json");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // Take CommonJS module string and write it as CSS to a separate .css file
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Take CommonJS module string and write it as CSS to a separate .css file
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Building Bootstrap scss files requires postcss-loader (with Autoprefixer config, specified in postcss.config.js)
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // EJS loader based on the underscore.js/Lodash implementation: https://github.com/difelice/ejs-loader
      {
        test: /\.ejs$/,
        loader: "ejs-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ].concat(
    pages.map((page) => {
      return new HtmlWebpackPlugin({
        filename: page.filename,
        template: `src/${page.filename}.ejs`,
        // Custom options used in the EJS template (e.g htmlWebpackPlugin.options.pageTitle):
        pageTitle: page.pageTitle,
        pageDescription: page.pageDescription,
      });
    })
  ),
};
