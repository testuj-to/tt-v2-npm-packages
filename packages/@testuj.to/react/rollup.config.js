
const { getBaseConfigs } = require('../../rollup.config')

module.exports = getBaseConfigs(require('./package.json')).map(function(config) {
    return {
        ...config,
        external: [
            /\.css$/,
        ],
    }
})
