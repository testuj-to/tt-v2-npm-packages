const path = require("path");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const alias = require("@rollup/plugin-alias");
const postcss = require("rollup-plugin-postcss");
const { terser } = require("rollup-plugin-minification");
const dts = require("rollup-plugin-dts").default;

const { listPackages } = require("../scripts/listPackages");

module.exports = {
    /**
     * @param {string} packageJson Path to a package.json file of the package being bundled
     * @returns {Array<import('rollup').RollupOptions>}
     */
    getBaseConfigs(packageJson = null) {
        const packages = listPackages();

        if (!packageJson || packages.indexOf(packageJson.name) < 0) {
            throw Error("Rollup Config Error: Invalid package name '" + packageJson.name + "'");
        }

        const buildPath = path.resolve(__dirname, packageJson.name, "build");
        const distPath = path.resolve(__dirname, packageJson.name, "dist");

        const input = path.join(buildPath, packageJson.name, "src/index.js");
        const inputTypings = path.join(buildPath, "typings", packageJson.name, "src/index.d.ts");

        const plugins = [
            postcss({
                extensions: [".css"],
            }),
            alias({
                entries: [{
                    find: "@lib",
                    replacement: path.resolve(buildPath, "lib"),
                }, ...packages.map(pkg => ({
                    find: pkg,
                    replacement: path.resolve(buildPath, pkg, "src"),
                }))],
            }),
            resolve(),
            commonjs(),
            terser(),
        ];

        const external = [
            "react",
            "react-dom",
        ];

        return [{
            input,
            plugins,
            external,
            output: {
                file: path.join(distPath, packageJson.browser),
                name: packageJson.name.split("/")[1],
                format: "umd",
                globals: {
                    "react": "React",
                    "react-dom": "ReactDOM",
                },
            },
        }, {
            input,
            plugins,
            external: [
                ...external,
                "ms",
            ],
            output: [{
                file: path.join(distPath, packageJson.main),
                format: "cjs",
                // globals: {
                //     'react': 'React',
                //     'react-dom': 'ReactDOM',
                // },
            }, {
                file: path.join(distPath, packageJson.module),
                format: "es",
                globals: {
                    "react": "React",
                    "react-dom": "ReactDOM",
                },
            }],
        }, {
            input: inputTypings,
            external: [
                /\.css$/u,
            ],
            plugins: [
                alias({
                    entries: [{
                        find: "@lib",
                        replacement: path.resolve(buildPath, "typings/lib"),
                    }, ...packages.map(pkg => ({
                        find: pkg,
                        replacement: path.resolve(buildPath, "typings", pkg, "src"),
                    }))],
                }),
                dts(),
            ],
            output: [{
                file: path.join(distPath, "index.d.ts"),
                format: "es",
            }],
        }];
    },
};
