import * as migration_20260807_221441_add_first_last_name from './20260807_221441_add_first_last_name';

export const migrations = [
  {
    up: migration_20260807_221441_add_first_last_name.up,
    down: migration_20260807_221441_add_first_last_name.down,
    name: '20260807_221441_add_first_last_name'
  },
];
