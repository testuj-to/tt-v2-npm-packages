const path = require("path");

const { listPackages } = require("../../../../scripts/listPackages");

module.exports = {
    framework: "@storybook/react",
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    managerEntries: ["./.storybook/ttContextAddon/register"],
    webpackFinal: async (config, { configType }) => {
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
                ...packages.reduce((aliases, package) => ({
                    ...aliases,
                    [package]: path.resolve(__dirname, "../build", package, "src"),
                }), {}),
            },
            extensions: [...(config.resolve || {}).extensions, "*", ".mjs", ".js", ".json"],
        };

        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: "javascript/auto",
        });

        return config;
    },
};
