let path = require('path');
let webpack = require('webpack');
let AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let environment = require('./environment.prod');

module.exports = {
  entry: {
    main: ['./src/main.ts'],
    polyfills: ['./src/polyfills.ts'],
    vendor: ['./src/vendor.ts']
  },

  output: {
    path: path.resolve(__dirname, '../../build/'),
    filename: '[name].js',
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
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack',
        options: {
          sourcemap: true
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=[path][name].[ext]&context=src'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
        })
      }
    ]
  },

  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: path.resolve(__dirname, '../../tsconfig.json'),
      entryModule: 'src/app/app.module#AppModule',
    }),
    new ExtractTextPlugin('[name].css'),
    new SpriteLoaderPlugin(),
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
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(environment)
    })
  ]
};
