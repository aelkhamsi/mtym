const common = require('./common')

function getPluginNestModules() {
  const pluginManifests = common.getPluginManifests()
  return pluginManifests.map(manifest => manifest.default.api.module)
}

module.exports = {
  getPluginNestModules
}