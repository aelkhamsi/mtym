import * as migration_20260807_221441_add_first_last_name from './20260807_221441_add_first_last_name';
import * as migration_20260905_194322_add_isjury from './20260905_194322_add_isjury';
import * as migration_20261104_161829_add_partner_scope from './20261104_161829_add_partner_scope';

export const migrations = [
  {
    up: migration_20260807_221441_add_first_last_name.up,
    down: migration_20260807_221441_add_first_last_name.down,
    name: '20260807_221441_add_first_last_name',
  },
  {
    up: migration_20260905_194322_add_isjury.up,
    down: migration_20260905_194322_add_isjury.down,
    name: '20260905_194322_add_isjury',
  },
  {
    up: migration_20261104_161829_add_partner_scope.up,
    down: migration_20261104_161829_add_partner_scope.down,
    name: '20261104_161829_add_partner_scope'
  },
];
