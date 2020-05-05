const prod = require('./webpack.config.prod');
const dev = require('./webpack.config.dev')
module.exports = (env, args) => {
  if(args.mode === 'development') {
    return dev;
  }
  return prod;
}