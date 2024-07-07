const path = require("path");

const { listPackages } = require("../../../../scripts/listPackages");

module.exports = {
    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    },

    stories: [
        // "../src/**/*.mdx",
        // "../src/**/*.stories.@(js|jsx|ts|tsx)"
        "../src/components/VideoPlayer/VideoPlayer.stories.tsx"
    ],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-webpack5-compiler-swc"
    ],

    // managerEntries: [
    //     "./.storybook/ttContextAddon/register",
    // ],
    webpackFinal: async(config, { configType }) => {
        const packages = listPackages();

        config.devServer = {
            ...(config.devServer || {}),
            open: false,
        };

        config.resolve = {
            ...(config.resolve || {}),
            alias: {
                ...(config.resolve || {}).alias,
                "@lib": path.resolve(__dirname, "../build/lib"),
                ...packages.reduce((aliases, pkg) => ({
                    ...aliases,
                    [pkg]: path.resolve(__dirname, "../build", pkg, "src"),
                }), {}),
            },
            extensions: [
                ...(config.resolve || {}).extensions,
                "*",
                ".mjs",
                ".js",
                ".json",
            ],
        };

        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
        });

        return config;
    },

    docs: {},

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};
