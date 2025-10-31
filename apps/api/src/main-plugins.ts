import { DataSource } from "typeorm"
import { Plugin } from "./modules/plugin/entities/plugin.entity"
import { getPluginManifests } from "@headstart/plugin-manager"

export async function getDataSource(): Promise<DataSource> {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [Plugin],
  })
  await dataSource.initialize()
  return dataSource
}

export async function fetchPlugins() {
  const dataSource = await getDataSource()
  const pluginRepository = dataSource.getRepository(Plugin)
  const plugins = await pluginRepository?.find()
  const pluginManifests = (await getPluginManifests())
    .map(manifest => manifest.default)

  for (const manifest of pluginManifests) {
    if (!plugins.find(plugin => plugin.id == manifest.id)) {
      const plugin = pluginRepository.create(manifest)
      pluginRepository.save(plugin)
    }
  }

  return pluginManifests.map(manifest => ({
    ...manifest,
    isEnabled: plugins.find(plugin => plugin.id == manifest.id)?.isEnabled ?? false,
  }))
}

