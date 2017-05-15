var webpack = require( 'webpack' );
var htmlWebpackPugin = require( 'html-webpack-plugin' );
var path = require( 'path' );

var development = process.env.NODE_ENV === 'development';
var production = process.env.NODE_ENV === 'production';

var entry = [];
entry = production ? [ './src/index.js' ] : entry;
entry = development ? [ './src/index.js', 'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080' ] : entry;

var plugins = development ? [ new webpack.HotModuleReplacementPlugin() ] : [ new webpack.optimize.UglifyJsPlugin() ];

var htmlWebpackPluginConfig = {
  template: 'src/htmlTemplate/index.pug'
};

plugins.push( new htmlWebpackPugin( htmlWebpackPluginConfig ) );

module.exports = {
  devtool: 'sourcemaps',
  entry: entry,
  plugins: plugins,
  module:{
      loaders: [
        {
          test: /\.js$/,
          loader: [ 'babel-loader' ],
          exclude: '/node_modules/'
        },
        {
          test: /\.pug$/,
          loader: [ 'pug-loader' ]
        }
    ]
  },
  output: {
    path: path.join( __dirname + '/dist' ),
    publicPath: '/',
    filename: 'bundle.js'
  }
};
