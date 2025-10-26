const path = require('path')
const fs = require('fs')

function getPluginRoot() {
  // possibility to use glob to scan for plugins folder
  return path.join(__dirname, "../../../plugins")
}

function getPluginDirs() {
  const pluginRoot = getPluginRoot()
  const pluginDirs = fs.readdirSync(pluginRoot)
    .map(file => path.join(pluginRoot, file))
    .filter(file => fs.statSync(file).isDirectory())

  return pluginDirs
}

function getPluginManifests() {
  const pluginDirs = getPluginDirs()
  const pluginManifestsPath = pluginDirs.map(dir => path.join(dir, 'dist/index.js'))
  const pluginManifests = []

  pluginManifestsPath.forEach(path => {
    pluginManifests.push(require(path))
  })

  return pluginManifests
}

module.exports = {
  getPluginRoot,
  getPluginDirs,
  getPluginManifests,
}