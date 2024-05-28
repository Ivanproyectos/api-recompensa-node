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
  private readonly app: Application
  constructor () {
    this.app = express()
    this.middleware()
    this.routes()
  }

  middleware (): void {
    this.app.use(helmet({
      crossOriginResourcePolicy: false
    }))
    // esta configuracion establece que nustra carpeta public es un ruta estatica para servir recursos multimedia
    // this.app.use(express.static('public'))
    // this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(cors())
  }

  async dbContection (): Promise<void> {
    try {
      await sequelize.authenticate()
    } catch (error: any) {
      console.log(error)
    }
  }

  routes (): void {
    this.app.use(indexRoute)
    this.app.use(authRoute)
    this.app.use('/api', buscadosRoute)
    this.app.use('/api', donwloadRoute)
    this.app.use((req, res) => {
      res.status(404).send({ error: 'enpoint not found' })
    })
  }

  listen (): void {
    this.app.listen(config.port, () => {
      console.log(`Server on port ${config.port}: http://localhost:${config.port}`)
    })
  }
}

export default Server
