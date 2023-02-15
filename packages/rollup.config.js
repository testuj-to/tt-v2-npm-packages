
const path = require('path')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const alias = require('@rollup/plugin-alias')
const postcss = require('rollup-plugin-postcss')
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

        const input = path.join(buildPath, 'packages', packageJson.name, 'src/index.js')
        const inputTypings = path.join(buildPath, 'typings/packages', packageJson.name, 'src/index.d.ts')

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
                    replacement: path.resolve(buildPath, 'packages', package, 'src'),
                }))],
            }),
            resolve(),
            commonjs(),
        ]

        const external = []

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
                        replacement: path.resolve(buildPath, 'typings/packages', package, 'src'),
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
