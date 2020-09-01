/**
 * 开发阶段的配置
 * 代码热更新：
 * * 1.CSS 热更新
 * * 2.JS  热更新
 * sourcemap
 */

 const merge=require('webpack-merge');

 const webpack=require('webpack')
 const baseConfig=require('./webpack.base');

 const devConfig={
     mode:'development',
     plugins:[
         new webpack.HotModuleReplacementPlugin()
     ],
     devServer:{
         contentBase:'./dist',
         hot:true,
         stats:'errors-only'
     },
     devtool: 'cheap-source-map',
 }

 module.export=merge(baseConfig,devConfig)