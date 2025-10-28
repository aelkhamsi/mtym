import { getPluginManifests } from './common'

export async function getPluginNestModules() {
  const manifests = await getPluginManifests()
  return manifests.map(manifest => manifest.default.api.module)
}