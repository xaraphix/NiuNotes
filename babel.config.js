module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        alias: {
          '@components': './src-frontend/components/index',
          '@constants': './src-frontend/constants/index',
          '@hooks': './src-frontend/hooks/index',
          '@screens': './src-frontend/screens/index',
          '@stores': './src-frontend/stores/index',
          '@types': './src-frontend/types/index',
          '@utils': './src-frontend/utils/index',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
