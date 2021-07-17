module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  transpileDependencies: ['vuetify'],
  pwa: {
    name: '北鳥例行',
    themeColor: '#558B2F',
    msTileColor: '#558B2F',
    backgroundColor: '#7BBE91',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      navigateFallback: 'index.html',
    },
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    manifestOptions: {
      background_color: '#7BBE91',
    },
  },
}
