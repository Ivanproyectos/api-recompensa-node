import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { sequelize } from './database/recompensadb'
import buscadosRoute from './routes/buscado.route'
import indexRoute from './routes/index.route'
import authRoute from './routes/auth.route'
import donwloadRoute from './routes/donwload.route'
import categoriaRoute from './routes/categorias.route'
import config from './config'

class Server {
  private readonly expressApp: Application

  constructor () {
    this.expressApp = express()
    this.initializeApp()
  }

  private initializeApp (): void {
    this.configureMiddleware()
    this.configureRoutes()
    this.connectToDatabase()
  }

  private configureMiddleware (): void {
    this.expressApp.use(helmet({
      crossOriginResourcePolicy: false
    }))
    this.expressApp.use(express.json())
    this.expressApp.use(cors())
  }

  private configureRoutes (): void {
    this.expressApp.use(indexRoute)
    this.expressApp.use('/api', authRoute)
    this.expressApp.use('/api', buscadosRoute)
    this.expressApp.use('/api', donwloadRoute)
    this.expressApp.use('/api', categoriaRoute)
    this.expressApp.use((req, res) => {
      res.status(404).send({ error: 'endpoint not found' })
    })
  }

  private connectToDatabase (): void {
    sequelize.authenticate().then(() =>
      console.log('Connection has been established successfully.'))
      .catch((error) => console.error('Unable to connect to the database:', error))
    console.log('Connection has been established successfully.')
  }

  public start (): void {
    this.expressApp.listen(config.port, () => {
      console.log(`Server on port ${config.port}: http://localhost:${config.port}`)
    })
  }
}

export default Server
