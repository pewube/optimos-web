const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",

  entry: { loader: "./src/loader.js", main: "./src/index.js" },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]-[contenthash:4].js",
    publicPath: "/",
  },

  devServer: {
    open: true,
    contentBase: path.join(__dirname, "public"),
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", { useBuiltIns: "usage", corejs: "3.6" }],
          ],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: { plugins: [require("autoprefixer")] },
          },
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./src/templates/template.html" }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:4].css",
    }),
    // new CopyPlugin({
    //   patterns: [{ from: "public" }],
    // }),
  ],
};
