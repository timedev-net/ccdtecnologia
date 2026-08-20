import * as migration_20260820_012755_add_portal_applications from './20260820_012755_add_portal_applications';

export const migrations = [
  {
    up: migration_20260820_012755_add_portal_applications.up,
    down: migration_20260820_012755_add_portal_applications.down,
    name: '20260820_012755_add_portal_applications'
  },
];
