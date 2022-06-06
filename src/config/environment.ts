import { config } from 'dotenv';

config();

const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PORT,
} = process.env;

if (
  !PORT ||
  !DB_HOST ||
  !DB_USER ||
  !DB_NAME ||
  !DB_PORT
) {
  throw new Error('Not all .env variables are configured');
}

const envConfig = {
  port: PORT,
  dbHost: DB_HOST,
  dbUser: DB_USER,
  dbName: DB_NAME,
  dbPort: DB_PORT,
};

export default envConfig;