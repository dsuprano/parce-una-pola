module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          components: './src/components',
          helpers: './src/helpers',
          lang: './src/lang',
          models: './src/models',
          navigation: './src/navigation',
          providers: './src/providers',
          screens: './src/screens',
          services: './src/services',
          stores: './src/stores',
        },
      },
    ],
    ['@babel/plugin-transform-runtime', { helpers: true }],
  ],
};
