module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: true,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}
