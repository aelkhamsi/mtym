import * as migration_20260827_123444_initial_migration from './20260827_123444_initial_migration';

export const migrations = [
  {
    up: migration_20260827_123444_initial_migration.up,
    down: migration_20260827_123444_initial_migration.down,
    name: '20260827_123444_initial_migration',
  },
];
