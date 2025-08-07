
const defaultPresets = require("../contextPresets.json");

export const parameters = {
    // actions: {
    //     argTypesRegex: "^on[A-Z].*",
    // },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    ttContext: {
        presets: defaultPresets,
    },
};
export const tags = ["autodocs"];
