const path = require('path');
const config = require('./config');

module.exports = {
  devServer: {
    proxy: config.dev.proxyTable,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src/'),
        '@utils': path.resolve('src/commom/utils/'),
        '@comp': path.resolve('src/components/'),
      },
    },
  },
};
