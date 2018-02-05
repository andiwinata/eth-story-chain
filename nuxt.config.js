module.exports = {
  // http://bgraphic.no/using-bulma-font-awsome-nuxt/
  // https://nuxtjs.org/api/configuration-css/
  css: [
    { src: 'bulma/bulma.sass', lang: 'sass' },
    // below one doesn't work with fa 5
    // { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' },
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'eth-story-chain',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Peer 2 peer lending in ethereum' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // for some reason font-awesome npm doesn't work with v5
      // https://stackoverflow.com/questions/47788847/fontawesome-5-font-family-not-work
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  mode: 'spa',
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          warnings: false
        }
      }
    }
  },
  // add base route if building for github page
  ...(process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
      router: {
        base: '/eth-story-chain/'
      }
    }
    : {})
}
