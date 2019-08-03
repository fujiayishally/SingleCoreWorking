var path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.')
            return '/index.html'
          } else if (process.env.MOCK !== 'none') {
            const name = req.path
              .split('/api/')[1]
              .split('/')
              .join('_')
            delete require.cache[require.resolve(`./mock/${name}`)]
            const mock = require(`./mock/${name}`)
            const result = mock(req, res)
            res.send(result)
          }
        },
      },
    },
  },
}
