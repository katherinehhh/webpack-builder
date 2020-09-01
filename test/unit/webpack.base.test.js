const assert = require('assert');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base')
    const prodConfig = require('../../lib/webpack.prod.js')
    const devConfig = require('../../lib/webpack.dev.js')


    // console.log(prodConfig)
    console.log(devConfig)
    it('entry', () => {
        console.log(baseConfig)
        // assert.equal(baseConfig.entry.index.indexOf('test/smoke/template/src/index/index.js'));
        // assert.equal(baseConfig.entry.search.indexOf('test/smoke/template/src/search/index.js'));
    });
});