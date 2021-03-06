const path = require('path');

var fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('webpack');

const onlyUnique = function(value, index, self) {
  return self.indexOf(value) === index;
}

//Ignore node_modules and non ts files
const files = fs.readdirSync('.')
  .filter(x => x.includes("."))
  .map(x => x.split(".").pop())
  .filter(x => x != "ts")
  .filter(onlyUnique)
  .map(x => path.resolve("**." + x))
  .concat(path.resolve("./node_modules/**"))

module.exports = {
  mode: "development",
  watch: false,
  watchOptions: {
    ignored: files
  },
  entry: {
    index:'./index.ts',
    breakout:'./breakout.ts',
    pong:'./pong.ts',
  },
  devtool: 'inline-source-map',
  stats: {
    version: false,
    hash: false,
    entrypoints: false,
    assets : false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: './index.html',
      template: './index.html',
      excludeChunks:['pong','breakout']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './pong.html',
      template: './pong.html',
      excludeChunks:['index','breakout']
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: './breakout.html',
      template: './breakout.html',
      excludeChunks:['pong','index']
    })
  ]
};
