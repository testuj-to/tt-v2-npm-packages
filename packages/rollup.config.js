
const path = require('path')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const alias = require('@rollup/plugin-alias')
const dts = require('rollup-plugin-dts').default

const packages = [
    '@testuj.to/api',
    '@testuj.to/auth',
    '@testuj.to/react',
]

module.exports = {
    getBaseConfigs(packageJson = null) {
        if (!packageJson || !/^\@testuj\.to\//.test(packageJson.name)) {
            throw Error('Rollup Config Error: Invalid package name \'' + packageJson.name + '\'')
        }

        const buildPath = path.resolve(__dirname, packageJson.name, 'build')
        const distPath = path.resolve(__dirname, packageJson.name, 'dist')

        const inputPathJs = path.join(buildPath, 'packages', packageJson.name, 'src/index.js')
        const inputPathDts = path.join(buildPath, 'typings/packages', packageJson.name, 'src/index.d.ts')

        const aliasPlugin = alias({
            entries: [{
                find: '@lib',
                replacement: path.resolve(buildPath, 'lib'),
            }, ...packages.map(package => ({
                find: package,
                replacement: path.resolve(buildPath, 'packages', package, 'src'),
            }))],
        })

        const typingAliasPlugin = alias({
            entries: [{
                find: '@lib',
                replacement: path.resolve(buildPath, 'typings/lib'),
            }, ...packages.map(package => ({
                find: package,
                replacement: path.resolve(buildPath, 'typings/packages', package, 'src'),
            }))],
        })

        return [{
            input: inputPathJs,
            output: {
                file: path.join(distPath, packageJson.browser),
                name: packageJson.name.split('/')[1],
                format: 'umd',
            },
            plugins: [
                aliasPlugin,
                resolve(),
                commonjs(),
            ],
        }, {
            input: inputPathJs,
            external: [ 'ms' ],
            output: [{
                file: path.join(distPath, packageJson.main),
                format: 'cjs',
            }, {
                file: path.join(distPath, packageJson.module),
                format: 'es',
            }],
            plugins: [
                aliasPlugin,
                resolve(),
                commonjs(),
            ],
        }, {
            input: inputPathDts,
            output: [{
                file: path.join(distPath, 'index.d.ts'),
                format: 'es',
            }],
            plugins: [
                typingAliasPlugin,
                dts(),
            ],
        }]
    },
}
