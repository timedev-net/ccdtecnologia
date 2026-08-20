import * as initialSchema from './20260820_193000_initial_schema'

export const postgresMigrations = [
  {
    up: initialSchema.up,
    down: initialSchema.down,
    name: '20260820_193000_initial_schema',
  },
]
