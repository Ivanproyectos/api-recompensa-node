import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET
}

export const dbConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.BD_PORT) ?? 3306,
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASS ?? 'admin',
  database: process.env.DB_DATABASE ?? 'recompensa'
}
