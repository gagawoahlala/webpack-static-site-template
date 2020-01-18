
var path = require("path");
const isDevelopment = process.env.NODE_ENV === 'development'
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.min.js'
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: isDevelopment ? '[name].css' : '[name].[hash].css',
    chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
  }), new HtmlWebpackPlugin({
    template: './src/index.html'
  })
  ],
  module: {
    rules: [
      { test: /\.(svg|gif|png|eot|woff|ttf)$/, 
        use: {
          loader: 'url-loader'
        }
      },
      { test: /\.js$/,
         use: {
           loader: "babel-loader",
           options: { presets: ['es2015']}
         }
      },
      {
        test: /\.(sa|sc)ss$/,
        // exclude: [/node_modules/],
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js'
                }
              }
            },
            'sass-loader'
          ]
      },
      {
        test: /\.css$/,
        // exclude: [/node_modules/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
            }
          }, 
          'css-loader'
        ]
      },
    ]
  }
}