const { ModuleFederationPlugin } = require('webpack').container

const exposes = require('./exposes')
const remotes = require('./remotes')
const package = require('../package.json')

module.exports = new ModuleFederationPlugin({
  filename: "remoteEntry.js",
  name: package.remoteName,
  exposes,
  remotes,
})