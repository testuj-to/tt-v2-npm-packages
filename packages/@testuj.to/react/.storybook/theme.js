
const { create } = require('@storybook/theming')

module.exports = create({
    base: 'light', // 'dark',
    colorPrimary: 'rgb(255,122,4)',
    colorSecondary: 'rgb(48,169,212)',
    brandTitle: 'Testuj.to',
    brandUrl: '/',
    brandImage: 'https://www.testuj.to/static/img/3826289037/services/testujto/testujto-logo.png',
    brandTarget: '_self',
})
