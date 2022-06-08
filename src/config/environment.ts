import { config } from 'dotenv';

config();

const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PORT,
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_PHONE_NUMBER,
} = process.env;

if (
  !PORT ||
  !DB_HOST ||
  !DB_USER ||
  !DB_NAME ||
  !DB_PORT ||
  !ADMIN_FIRST_NAME ||
  !ADMIN_LAST_NAME ||
  !ADMIN_EMAIL ||
  !ADMIN_PASSWORD ||
  !ADMIN_PHONE_NUMBER
) {
  throw new Error('Not all .env variables are configured');
}

const envConfig = {
  port: PORT,
  dbHost: DB_HOST,
  dbUser: DB_USER,
  dbName: DB_NAME,
  dbPort: DB_PORT,
  adminFirstName: ADMIN_FIRST_NAME,
  adminLastName: ADMIN_LAST_NAME,
  adminEmail: ADMIN_EMAIL,
  adminPassword: ADMIN_PASSWORD,
  adminPhoneNumber: ADMIN_PHONE_NUMBER,
};

export default envConfig;