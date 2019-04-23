// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dev.sqlite3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds/dev',
    },
    useNullAsDefault: true,
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/testing.sqlite3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds/testing',
    },
    useNullAsDefault: true,
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
