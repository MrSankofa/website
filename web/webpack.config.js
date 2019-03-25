const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");

require('dotenv').config()

module.exports = (env, argv) => {
  let plugins = [
    new PrettierPlugin(),
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin([
      { from: 'src/assets', to: 'assets' }
    ])
  ]
  if (argv.mode === 'production') plugins.push(new S3Plugin({
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'
    },
    s3UploadOptions: {
      Bucket: 'www.onesundayatatime.com'
    },
    cloudfrontInvalidateOptions: {
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      Items: ["/*"]
    }
  }))
  return {
    entry: [
      'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
      './src/index.tsx'
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.min.js',
      publicPath: '/'
    },
    devServer: {
      inline: true,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080
    },
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {
      rules: [
        { 
          test: /\.tsx?$/, 
          loader: 'awesome-typescript-loader'
        }
      ]
    },
    plugins
  }
}