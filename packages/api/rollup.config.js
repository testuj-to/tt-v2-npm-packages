
const path = require('path')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const dts = require('rollup-plugin-dts').default

const packageJson = require('./package.json')

const pathBuild = process.env.PATH_BUILD || 'build'
const pathDist = process.env.PATH_DIST || 'dist'
const pathEntryDirectory = 'packages/api/src'

module.exports = [{
    input: path.join(pathBuild, pathEntryDirectory, 'index.js'),
    output: {
        file: path.join(pathDist, packageJson.browser),
        format: 'umd',
        name: 'auth',
    },
    plugins: [
        resolve(),
        commonjs(),
    ],
}, {
    input: path.join(pathBuild, pathEntryDirectory, 'index.js'),
    external: [ 'ms' ],
    output: [{
        file: path.join(pathDist, packageJson.main),
        format: 'cjs',
    }, {
        file: path.join(pathDist, packageJson.module),
        format: 'es',
    }],
    plugins: [
        resolve(),
        commonjs(),
    ],
}, {
    input: path.join(pathBuild, 'typings', pathEntryDirectory, 'index.d.ts'),
    output: [{
        file: path.join(pathDist, 'index.d.ts'),
        format: 'es',
    }],
    plugins: [
        dts(),
    ],
}]
