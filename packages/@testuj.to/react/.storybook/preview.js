
const { defaultPresets } = require('../contextPresets')

exports.parameters = {
    actions: {
        argTypesRegex: '^on[A-Z].*',
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    ttContext: {
        presets: defaultPresets,
    },
}
