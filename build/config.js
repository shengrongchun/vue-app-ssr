const path = require('path')

module.exports = {
    rootPath: path.resolve(__dirname, '../'),
    srcPath:  path.resolve(__dirname, '../src'),
    distPath:  path.resolve(__dirname, '../ssr/dist'),
    buildPath:  path.resolve(__dirname, '../build')
}