const path=require("path");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports={
    entry: path.resolve(__dirname, 'src/scripts/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    module:{
        rules:[
            // Style & CSS Loader
            {
                test:/\.css/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              }
        ]
    },
    plugins:[
        // HTML Webpack Plugin
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/template/index.html'),
          filename:"index.html"
      }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'src/public/'),
              to: path.resolve(__dirname, 'dist/'),
            },
          ],
        }),
        new BundleAnalyzerPlugin(),
    ]
}