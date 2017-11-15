let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let environment = require('./environment.dev');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    main: ['./src/main.ts'],
    polyfills: ['./src/polyfills.ts'],
    vendor: ['./src/vendor.ts']
  },

  output: {
    path: path.resolve(__dirname, '../../dist/'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [ path.resolve(__dirname, '../../node_modules') ],
    symlinks: true
  },

  resolveLoader: {
    modules: [ path.resolve(__dirname, '../../node_modules') ],
  },

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          { loader: 'ts-loader' },
          { loader: 'angular2-template-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        include: /assets\/images/,
        use: [
          {
            loader: 'file-loader?name=assets/[name].[ext]'
          }
        ]
      },
      {
        test: /\.svg$/,
        include: /assets\/icons/,
        use: [
          {
            loader: 'svg-sprite-loader'
          }
        ]
      },
      {
        test: /\.json$/,
        include: /ink\//,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('postcss-smart-import')({ addDependencyTo: webpack }),
                  require('postcss-url')(),
                  require('postcss-cssnext')({ browsers: ['last 2 versions', 'Firefox ESR', 'IE 9'] })
                ];
              }
            }
          }
        ]
      }
    ]
  },

  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true
  },

  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
    }),
    new webpack.NamedModulesPlugin({}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(environment)
    })
  ]
};
