const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const { rootPath, distPath, srcPath } = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: distPath,
    //publicPath: 'dist/',
    filename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'vue-ui': path.resolve(srcPath,'components/ui'),
      '@': srcPath
    },
    extensions: ['.js', '.vue', '.json'] // 可以不加后缀, 直接使用 import xx from 'xx' 的语法
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        query: {
          objectAssign: 'Object.assign'
        }
      },
      {
          test: /\.md$/,
          loader: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: 'css-loader!sass-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'css/common.[chunkhash].css'
        }),
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
      ]
    : [
        new FriendlyErrorsPlugin()
      ]
}
