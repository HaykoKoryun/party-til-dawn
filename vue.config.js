const path = require('path');

module.exports = {
  publicPath: '.',
  pluginOptions: {
    'resolve-alias': {
      alias: {
        assets: path.resolve(__dirname, './assets')
      }
    }
  },
  configureWebpack: {
    resolve: {
      modules: [
          path.resolve(__dirname, './src/'),
      ]
    }
  }
}
