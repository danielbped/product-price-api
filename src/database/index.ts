import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import Products from '../entity/Products';
import Packs from '../entity/Packs';

dotenv.config();

const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB,
  HOST_DB
} = process.env;


export const AppDataSource = new DataSource({
  type: "mysql",
  host: HOST_DB,
  port: 3308,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  synchronize: true,
  logging: false,
  entities: [Products, Packs],
  migrations: [],
  subscribers: [],
})

const databaseConnect = () => AppDataSource
  .initialize()
  .then(async () => {
      console.log('Database connected successfully')
  }).catch((error: any) => console.log(error))

export default databaseConnect;