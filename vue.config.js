const path = require('path');
const config = require('./config');

module.exports = {
  devServer: {
    proxy: config.dev.proxyTable,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@utils': path.resolve('src/commom/utils/'),
      },
    },
  },
};
