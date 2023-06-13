module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|react-native-unimodules|@react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)/)',
    ],
    setupFiles: ['./jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  