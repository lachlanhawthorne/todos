module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',{
          "moduleName": "@env",
          "path": ".env",
        }
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
        },
      ],
      ['transform-inline-environment-variables', {
        include: 'TAMAGUI_TARGET'
      }]
    ],
  }
}
