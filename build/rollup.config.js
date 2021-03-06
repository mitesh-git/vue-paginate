const buble = require('rollup-plugin-buble')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version

const replaceConfig = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  'process.env.VUE_ENV': JSON.stringify(process.env.VUE_ENV || 'development')
}

module.exports = {
  entry:'src/index.js',
  dest: 'dist/vue-paignate-api.js',
  format: 'umd',
  moduleName: 'VuePaginateApi',
  plugins: [replace(replaceConfig), node(), cjs(), buble()],
  banner:
`/**
 * vue-paignate-api v${version}
 * (c) ${new Date().getFullYear()} Taha Shashtari & Mitesh Dheman
 * @license MIT
 */`
}