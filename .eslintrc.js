module.exports = {
    // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
    // This option interrupts the configuration hierarchy at this file
    // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
    root: true,
  
    // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
    // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
    // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      extraFileExtensions: ['.vue']
    },
  
    env: {
      browser: true,
      es2021: true,
      node: true,
      'vue/setup-compiler-macros': true
    },
  
    // Rules order is important, please avoid shuffling them
    extends: [
      // Base ESLint recommended rules
      // 'eslint:recommended',
  
      // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
      // ESLint typescript rules
      'plugin:@typescript-eslint/recommended',
  
      // Uncomment any of the lines below to choose desired strictness,
      // but leave only one uncommented!
      // See https://eslint.vuejs.org/rules/#available-rules
      'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
      // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
      // 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
  
      'standard'
  
    ],
  
    plugins: [
      // required to apply rules which need type information
      '@typescript-eslint',
  
      // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
      // required to lint *.vue files
      'vue'
  
    ],
  
    globals: {
      ga: 'readonly', // Google Analytics
      cordova: 'readonly',
      __statics: 'readonly',
      __QUASAR_SSR__: 'readonly',
      __QUASAR_SSR_SERVER__: 'readonly',
      __QUASAR_SSR_CLIENT__: 'readonly',
      __QUASAR_SSR_PWA__: 'readonly',
      process: 'readonly',
      Capacitor: 'readonly',
      chrome: 'readonly'
    },
  
    // add your custom rules here
    rules: {
      'vue/no-v-model-argument': 'off',
      'vue/no-mutating-props': 'off',
      'vue/no-unused-components': 'off',
      'vue/order-in-components': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/no-v-html': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/attributes-order': 'off',
      'vue/html-quotes': 'off',
      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  }
  