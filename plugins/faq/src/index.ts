import { FaqModule } from "./api/faq.module";
import { faqSchema } from "./faq.schema";

const faqPlugin = {
  id: 'faq',
  name: 'FAQ',
  schema: faqSchema,
  api: {
    module: FaqModule
  },
  front: {},
  admin: {},
}

export default faqPlugin;