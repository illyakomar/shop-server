import { config } from 'dotenv';

config();

const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_NAME,
} = process.env;

if (
  !PORT ||
  !DB_HOST ||
  !DB_USER ||
  !DB_NAME
) {
  throw new Error('Not all .env variables are configured');
}

const envConfig = {
  port: PORT,
  dbHost: DB_HOST,
  dbUser: DB_USER,
  dbName: DB_NAME,
};

export default envConfig;