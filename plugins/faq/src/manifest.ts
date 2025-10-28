import { FaqModule } from "./api/faq.module";
import { faqSchema } from "./faq.schema";
import { PluginManifest } from "@headstart/plugin-manager"

const manifest: PluginManifest = {
  id: 'faq',
  name: 'FAQ',
  description: 'this is an FAQ Plugin',
  schema: faqSchema,
  api: {
    module: FaqModule.register()
  },
  front: {},
  admin: {},
}

export default manifest;