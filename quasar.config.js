/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require('quasar/wrappers')

module.exports = configure(function (/* ctx */) {
  return {
    eslint: {
      fix: true,
      warnings: true,
      errors: true
    },

    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      'pinia',
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'app.sass'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'line-awesome',
      'roboto-font',
      'material-icons', // Kept because Quasar components use it
      'fontawesome-v5',
      'material-icons-round'
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node16'
      },

      vueRouterMode: 'hash'
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      open: true
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      lang: 'pt-BR',
      importStrategy: 'auto',
      plugins: ['Dialog', 'Notify', 'LoadingBar', 'BottomSheet', 'Loading'],
      config: {
        loadingBar: {
          color: 'primary',
          size: '6px'
        },

        brand: {
          primary: '#000000',
          secondary: '#b85607',
          accent: '#9c27b0',
          dark: '#251F47',
          'dark-page': '#121212',
          positive: '#71B48D',
          negative: '#C10015',
          info: '#4431ec',
          warning: '#f2c037'
        }
      }
    }
  }
})
