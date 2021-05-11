module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/2021/' : '/',

  transpileDependencies: ['vuetify'],
  pwa: {
    name: '北鳥例行',
    themeColor: '#607D8B',
    msTileColor: '#607D8B',
    backgroundColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      navigateFallback: 'index.html',
    },
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png',
    },
    manifestOptions: {
      background_color: '#000000',
    },
  },
}
