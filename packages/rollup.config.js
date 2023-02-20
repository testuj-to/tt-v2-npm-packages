
const path = require('path')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const alias = require('@rollup/plugin-alias')
const postcss = require('rollup-plugin-postcss')
const { terser } = require('rollup-plugin-minification')
const dts = require('rollup-plugin-dts').default

const { listPackages } = require('../scripts/listPackages')

module.exports = {
    getBaseConfigs(packageJson = null, external = []) {
        const packages = listPackages()

        if (!packageJson || packages.indexOf(packageJson.name) < 0) {
            throw Error('Rollup Config Error: Invalid package name \'' + packageJson.name + '\'')
        }

        const buildPath = path.resolve(__dirname, packageJson.name, 'build')
        const distPath = path.resolve(__dirname, packageJson.name, 'dist')

        const input = path.join(buildPath, packageJson.name, 'src/index.js')
        const inputTypings = path.join(buildPath, 'typings', packageJson.name, 'src/index.d.ts')

        const plugins = [
            postcss({
                extensions: [ '.css' ],
            }),
            alias({
                entries: [{
                    find: '@lib',
                    replacement: path.resolve(buildPath, 'lib'),
                }, ...packages.map(package => ({
                    find: package,
                    replacement: path.resolve(buildPath, package, 'src'),
                }))],
            }),
            resolve(),
            commonjs(),
            terser(),
        ]

        return [{
            input,
            plugins,
            external,
            output: {
                file: path.join(distPath, packageJson.browser),
                name: packageJson.name.split('/')[1],
                format: 'umd',
            },
        }, {
            input,
            plugins,
            external: [ ...external, 'ms' ],
            output: [{
                file: path.join(distPath, packageJson.main),
                format: 'cjs',
            }, {
                file: path.join(distPath, packageJson.module),
                format: 'es',
            }],
        }, {
            input: inputTypings,
            external: [
                /\.css$/u,
            ],
            plugins: [
                alias({
                    entries: [{
                        find: '@lib',
                        replacement: path.resolve(buildPath, 'typings/lib'),
                    }, ...packages.map(package => ({
                        find: package,
                        replacement: path.resolve(buildPath, 'typings', package, 'src'),
                    }))],
                }),
                dts(),
            ],
            output: [{
                file: path.join(distPath, 'index.d.ts'),
                format: 'es',
            }],
        }]
    },
}
