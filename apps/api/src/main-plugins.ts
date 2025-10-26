import { DataSource } from "typeorm"
import { Plugin } from "./modules/plugin/entities/plugin.entity"
import { registerPlugins } from "@mdm/registry"

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
  const plugins = pluginRepository?.find() 
  await registerPlugins()
  return plugins
}

