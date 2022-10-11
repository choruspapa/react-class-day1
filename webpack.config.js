var webpack = require('webpack');
var path = require('path');
var process = require('process');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const NODE_ENV = process.env.NODE_ENV;
  if (!['production', 'development'].includes(NODE_ENV))
    throw Error('[NODE_ENV] must be production or development');

  console.log(`mode: ${NODE_ENV}`);
  const DEV = NODE_ENV === 'development';
  const mode = DEV ? 'development' : 'production';
  const devtool = DEV ? 'eval-source-map' : false;
  const lastCssLoader = DEV ? 'style-loader' : MiniCssExtractPlugin.loader;
  const miniCssExtractPlugin = DEV
    ? { apply: () => {} }
    : new MiniCssExtractPlugin({ 
      filename: 'css/[name].[chunkhash].css' 
    });
  const refreshWebpackPlugin = DEV ? new RefreshWebpackPlugin() : { apply: () => {} };
  const refreshBabel = DEV ? 'react-refresh/babel' : {};
  const BASE_URL = DEV ? '' : 'fe-vm';
  const definePlugin = new webpack.DefinePlugin({
    'process.env.PUBLIC_URL': 'public',
    'process.env.BASE_URL': JSON.stringify(BASE_URL),
  });

  return {
    mode: mode,
    performance: { hints: false },
    entry: {
      index: './src/index.js',
    },

    output: {
      filename: '[name].[chunkhash].bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true
    },

    devServer: {
      hot: true,
      //inline: true,
      //host: '0.0.0.0',
      port: 4000,
      static: {
        directory: path.join(__dirname, 'public'),
      }
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [refreshBabel/*, 'styled-components'*/],
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [lastCssLoader, 'css-loader'],
        },
      ]
    },

    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      definePlugin,
      miniCssExtractPlugin,
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      refreshWebpackPlugin,
    ],


    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks:{
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name(module) {
              //console.log(`module: ${module.context}`);
              return 'vendor';
            },
            enforce: true,
            chunks: 'all',
          },
        }
      },
    }
  }
}