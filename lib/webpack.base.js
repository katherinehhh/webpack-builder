/**
 * 基础配置内容
 * 资源解析：
 * *1.解析ES6
 * *2.解析React,
 * *3.解析CSS
 * *4.解析less
 * *5.解析图片
 * *6.解析字体
 * 样式增强：
 * * 1.CSS前缀补齐 autoprefixer
 * * 2.CSS px 转换成rem 
 * 目录清理
 * 多页面打包
 * 命令行信息显示优化
 * 错误捕获和处理
 * CSS提取成一个单独的文件 (该插件的主要是为了抽离 css 样式,防止将样式打包在 js 中文件过大和因为文件大网络请求超时的情况)
 */

 const path=require('path');
 const glob=require('glob');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const projectRoot = process.cwd();
const getPageConfig = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      // '/Users/cpselvis/my-project/src/index/index.js'

      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      return htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          inlineSource: '.css$',
          template: path.join(projectRoot, `./src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['vendors', pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        })
      );
    });

  return {
    entry,
    htmlWebpackPlugins,
  };
};


const {entry,htmlPlugins}=getPageConfig()
 module.export={
     entry:entry,
     module:{
          rules:[
              {test:'/.js$/',use:[{loader:'babel-loader'}]},
              {test:'/.css$/',use:[ MiniCssExtractPlugin.loader,'css-loader']},
              {test:'./less$/',use:[ 
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'less-loader',
                  {
                    loader: 'postcss-loader',
                    options: {
                      plugins: () => [
                        autoprefixer({
                          browsers: ['last 2 version', '>1%', 'ios 7'],
                        }),
                      ],
                    },
                  },
                  {
                   loader:'px2rem-loader',
                   options:{
                       remUnit:75,

                   }   
                  }
                ]},
              {test:'./(png|jpg|gif|jpeg)$/',use:[{
                  loader:'file-loader',
                  options: {
                      name:`[name]_[hash:8].[ext]`
                  }
              }]},
              {test:'/.(woff|woff2|eot|ttf|otf)$/',use:[{
                  loader:'file-loader',
                  options: {
                      name:`[name]_[hash:8].[ext]`
                  }
              }]}
          ]
      },
      plugin:[
          new CleanWebpackPlugin(),
          new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
          }),
          new FriendlyErrorsWebpackPlugin(),
          function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
              if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                process.exit(1);
              }
            });
          },  
      ].concat(htmlPlugins),
      stats: 'errors-only',
 }