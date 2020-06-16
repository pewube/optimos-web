const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // mode: "development",
  mode: "production",

  entry: { main: "./src/index.js" },

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
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        // use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./src/templates/template.html" }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:4].css",
    }),
  ],
};
