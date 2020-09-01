/**
 * 生产阶段配置
 * 代码压缩
 * 文件指纹
 * Tree Shaking
 * Scope Hosting
 * 速度优化：基础包CDN
 * 体积优化：代码分割
 */

const { optimize } = require('webpack');
const merge = require('webpack-merge');
const cssnano = require('cssnano');// 压缩css处理器
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const baseConfig = require('./webpack.base');

const prodConfig={
    mode:'production',
    plugins:[
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,//匹配css
            cssProcessor: cssnano,
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
              {
                module: 'react',
                entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
                global: 'React',
              },
              {
                module: 'react-dom',
                entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
                global: 'ReactDOM',
              },
            ],
          }),
    ],
    optimization: {
        splitChunks: {
          minSize: 0,
          cacheGroups: {
            commons: {
              name: 'vendors',
              chunks: 'all',
              minChunks: 2,
            },
          },
        },
      },
}

module.exports = merge(baseConfig, prodConfig);
