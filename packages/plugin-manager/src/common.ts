import { join } from 'path'
import { readdirSync, statSync } from 'fs'

function getPluginRoot() {
  // possibility to use glob to search for plugins folder
  return join(__dirname, "../../../plugins")
}

function getPluginDirs() {
  const pluginRoot = getPluginRoot()
  const pluginDirs = readdirSync(pluginRoot)
    .map((file: string) => join(pluginRoot, file))
    .filter((file: string) => statSync(file).isDirectory())

  return pluginDirs
}

export async function getPluginManifests() {
  const pluginDirs = getPluginDirs()
  const manifestPaths = pluginDirs.map((dir: string) => join(dir, 'dist/manifest.js'))
  const manifests = []

  for (const path of manifestPaths) {
    const manifest = await import(path);
    manifests.push(manifest)
  }

  return manifests
}
