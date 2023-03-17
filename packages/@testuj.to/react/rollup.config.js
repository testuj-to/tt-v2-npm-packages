
const json = require('@rollup/plugin-json')

const { getBaseConfigs } = require('../../rollup.config')

module.exports = getBaseConfigs(require('./package.json')).map(config => {
    config.plugins = [ json(), ...(config.plugins || []) ]
    return config
})
