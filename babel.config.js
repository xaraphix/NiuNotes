module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        alias: {
          '@/components': './src-frontend/components',
          '@/constants': './src-frontend/constants',
          '@/utils': './src-frontend/utils',
          '@': './',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
