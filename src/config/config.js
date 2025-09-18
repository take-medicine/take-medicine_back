// REEMPLAZA todo el contenido actual con esto:
import 'dotenv/config';

const config = {
  development: {
    username: process.env.DB_USER || 'medicine_user',
    password: process.env.DB_PASS || 'medicine_pass_2025',
    database: process.env.DB_NAME || 'medicine_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: true
  },
  test: {
    username: process.env.DB_USER || 'medicine_user',
    password: process.env.DB_PASS || 'medicine_pass_2025',
    database: process.env.DB_TEST || 'medicine_test_db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    logging: false
  }
};

export default config;