
const { getBaseConfigs } = require('../../rollup.config')

module.exports = getBaseConfigs(require('./package.json'), [
    'react',
    'react-dom',
])
