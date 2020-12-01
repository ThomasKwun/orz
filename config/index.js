module.exports = {
  dev: {
    baseUrl: 'api/',
    useLocalApi: true, // 是否使用本地接口
    localApiList: [], // 如果为空数组，跟会去文件夹中检查，如果有则使用本地接口，如果数组不为空，则数组列表中的会使用本地接口
    proxyTable: {
      'api/*': {
        target: 'http://127.0.0.1:9001',
        changeOrigin: true,
      },
    },
  },
  mockServer: {
    host: '127.0.0.1',
    port: 9001,
    server: 'http://127.0.0.1:9005', // 如果本地api没有，则代理到目标地址
    template: 'mock/api',
  },
  webServer: {
    host: '127.0.0.1',
    port: 8081,
    publicDir: 'dist',
    entry: 'index.html',
  },
};
