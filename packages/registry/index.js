const path = require('path')
const fs = require('fs')

async function registerPlugins() {
  const pluginsDir = path.join(__dirname, "../../plugins")
  console.log('pluginsDir', pluginsDir, __dirname)

  const pluginsFolders = fs.readdirSync(pluginsDir)
    .filter(file => 
      fs.statSync(
        path.join(pluginsDir, file)
      ).isDirectory()
    )
  console.log('pluginsFolders', pluginsFolders)
}

module.exports = {
  registerPlugins
}