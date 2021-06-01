module.exports = {
  development: {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: null,
    database: 'liner_nest',
  },
  test: {
    dialect: 'mysql',
    host: 'localhost',
    username: 'roku',
    password: 'roku',
    database: 'test',
  },
  production: {
    dialect: 'mysql',
    host: 'localhost',
    username: 'roku',
    password: 'roku',
    database: 'prod',
  },
};
