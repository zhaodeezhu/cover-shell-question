const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
module.exports = {
  mode: 'production',
  entry: {
    func: './src/index.ts'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'umd',
    library: 'ShellQuestion'
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin()
  ]
}