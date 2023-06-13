module.exports = {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
    env: {
      development: {
        plugins: ['@babel/plugin-transform-react-jsx-source'],
      },
    },
  };
  