module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '北鳥例行'
      return args
    })
  },
  pwa: {
    name: '北鳥例行',
    themeColor: '#558B2F',
    msTileColor: '#558B2F',
    backgroundColor: '#558B2F',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      navigateFallback: 'index.html',
    },
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    manifestOptions: {
      background_color: '#558B2F',
    },
  },
}
