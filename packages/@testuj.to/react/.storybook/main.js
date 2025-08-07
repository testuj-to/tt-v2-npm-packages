const path = require("path");

module.exports = {
    framework: {
        name: "@storybook/react-webpack5",
        options: {}
    },

    stories: [
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
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
    webpackFinal: async (config, { configType }) => {
        config.devServer = {
            ...(config.devServer || {}),
            open: false,
        };

        config.resolve = {
            ...(config.resolve || {}),
            alias: {
                ...(config.resolve || {}).alias,
                "@lib": path.resolve(__dirname, "../src/lib"),
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
