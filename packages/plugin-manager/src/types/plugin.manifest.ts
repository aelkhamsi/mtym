import { z } from 'zod'
import { DynamicModule } from '@nestjs/common';

class FrontManifest {}

class AdminManifest {}

class ApiManifest {
  module: DynamicModule
}

export class PluginManifest {
  id: string;

  name: string;

  description: string;

  schema: z.ZodObject;

  api: ApiManifest;

  front: FrontManifest;

  admin: AdminManifest;
}
