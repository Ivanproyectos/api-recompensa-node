import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { sequelize } from './database/recompensadb'
import buscadosRoute from './routes/buscado.route'
import indexRoute from './routes/index.route'
import authRoute from './routes/auth.route'
import donwloadRoute from './routes/donwload.route'
import config from './config'

class Server {
  private readonly expressApp: Application

  constructor () {
    this.expressApp = express()
    this.initializeApp()
  }

  private async initializeApp (): Promise<void> {
    this.configureMiddleware()
    this.configureRoutes()
    await this.connectToDatabase()
  }

  private configureMiddleware (): void {
    this.expressApp.use(helmet())
    this.expressApp.use(express.json())
    this.expressApp.use(cors())
  }

  private configureRoutes (): void {
    this.expressApp.use(indexRoute)
    this.expressApp.use(authRoute)
    this.expressApp.use('/api', buscadosRoute)
    this.expressApp.use('/api', donwloadRoute)
    this.expressApp.use((req, res) => {
      res.status(404).send({ error: 'endpoint not found' })
    })
  }

  middleware (): void {
    this.expressApp.use(helmet({
      crossOriginResourcePolicy: false
    }))
    // esta configuracion establece que nustra carpeta public es un ruta estatica para servir recursos multimedia
    // this.app.use(express.static('public'))
    // this.app.use(helmet())
    this.expressApp.use(express.json())
    this.expressApp.use(cors())
  }

  private async connectToDatabase (): Promise<void> {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      throw new Error('Failed to connect to the database')
    }
  }

  routes (): void {
    this.expressApp.use(indexRoute)
    this.expressApp.use(authRoute)
    this.expressApp.use('/api', buscadosRoute)
    this.expressApp.use('/api', donwloadRoute)
    this.expressApp.use((req, res) => {
      res.status(404).send({ error: 'enpoint not found' })
    })
  }

  listen (): void {
    this.expressApp.listen(config.port, () => {
      console.log(`Server on port ${config.port}: http://localhost:${config.port}`)
    })
  }
}

export default Server
