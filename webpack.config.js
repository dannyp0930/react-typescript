const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 생성된 html 파일에 필요한 플러그인
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 빌드 캐시 삭제
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const dotenv = require('dotenv');
const production = process.env.NODE_ENV === 'production'; // 프로덕션 모드 여부 확인
dotenv.config({
  path: production ? '.env.production' : '.env.local',
});
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'https://localhost:8080';
const APP_TITLE = process.env.APP_TITLE || 'APP TITLE';

module.exports = {
  mode: production ? 'production' : 'development',
  devtool: production ? 'hidden-source-map' : 'eval', // 프로덕션 모드면 hidden-source-map
  entry: './src/index.tsx', // webpack 최초 진입점(엔트리 포인트) 파일 경로
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? '[name].[contenthash].js' : '[name].min.js',
  },
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
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: production ? 'babel-loader' : 'ts-loader',
      },
      {
        test: /\.(sass|css|scss)$/,
        use: [production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        type: 'assets',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
    ],
  },
  // webpack-dev-server
  devServer: {
    historyApiFallback: true,
    port: PORT,
    static: path.resolve(__dirname, 'dist'),
    server: {
      type: 'https',
      options: {
        key: path.resolve(__dirname, 'cert/localhost-key.pem'),
        cert: path.resolve(__dirname, 'cert/localhost.pem'),
      },
    },
    proxy: [
      {
        context: ['/api'],
        target: API_URL,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.sass', '.scss', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: APP_TITLE,
      minify: production
        ? {
            collapseWhitespace: true,
            removeComments: true,
          }
        : false,
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets'},
        { from: 'public/manifest.json', to: './'},
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash].css' : '[name].min.css',
    }),
    new ForkTsCheckerWebpackPlugin(),
    production && new WorkboxPlugin.InjectManifest({
      swSrc: './src/worker/index.ts',
      swDest: 'service-worker.js',
    }),
  ],
};
