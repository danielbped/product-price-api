import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
  HOST_DB
} = process.env;

const sequelize = new Sequelize(MYSQL_DB || '', MYSQL_USER  || '', MYSQL_PASSWORD, {
  host: HOST_DB,
  dialect: 'mysql',
  port: 3308,
  logging: false,
});

export default async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}