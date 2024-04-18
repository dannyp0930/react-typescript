const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 생성된 html 파일에 필요한 플러그인
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const production = process.env.NODE_ENV === "production"; // 프로덕션 모드 여부 확인

module.exports = {
  mode: production ? "production" : "development",
  devtool: production ? "hidden-source-map" : "eval", // 프로덕션 모드면 hidden-source-map
  entry: "./src/index.tsx", // webpack 최초 진입점(엔트리 포인트) 파일 경로
  optimization: {
    minimizer: production
      ? [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
          new CssMinimizerPlugin(),
        ]
      : [],
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extentions: [".js", ".jsx", ".ts", ".tsx", ".css"], // import를 할 때 확장자를 생략
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: production ? "babel-loader" : "ts-loader",
      },
      {
        test: /\.css$/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: production ? "[name].[contenthash].js" : "[name].min.js",
  },
  // webpack-dev-server
  devServer: {
    historyApiFallback: true,
    port: 3000,
    static: path.resolve(__dirname, "dist"),
    proxy: [
      {
        "/api": "localhost:8080",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: production ? "[name].[contenthash].css" : "[name].min.css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
