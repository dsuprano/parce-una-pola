module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'airbnb/hooks', 'plugin:react/recommended'],
  parser: '@babel/eslint-parser',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'jsx-a11y/href-no-hash': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/prop-types': [
      'warn',
      {
        ignore: ['navigation'],
      },
    ],
    'react/no-multi-comp': 'off',
    'react/prefer-stateless-function': [
      'warn',
      {
        ignorePureComponents: true,
      },
    ],
    'object-curly-newline': 'off',
    'prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',
    'array-callback-return': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'warn',
    'import/no-cycle': [
      'warn',
      {
        maxDepth: 1,
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  env: {
    browser: true,
  },
};
