// const path = require('path')

const extendConfig = config => {
  // config.copy = [
  //   ...config.copy,
  //   {
  //     from: path.resolve(config.assets, 'videos'),
  //     to: 'assets/videos',
  //   }
  // ]

  return config
}

module.exports = extendConfig
