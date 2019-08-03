module.exports = {
  presets: ['@vue/app', '@vue/babel-preset-jsx'],
  plugins: [
    [
      'import',
      {
        libraryName: 'iview',
        libraryDirectory: 'src/components',
      },
    ],
  ],
}
