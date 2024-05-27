import express, { Application } from 'express'
import helmet from 'helmet'
import { sequelize } from './database/recompensadb'
import buscadosRoute from './routes/buscado.route'
import indexRoute from './routes/index.route'
import config from './config'

class Server {
  private readonly app: Application
  constructor () {
    this.app = express()
    this.middleware()
    this.routes()
  }

  middleware (): void {
    this.app.use(helmet())
    this.app.use(express.json())
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
    this.app.use('/api', buscadosRoute)
  }

  listen (): void {
    this.app.listen(config.port, () => {
      console.log(`Server on port ${config.port}: http://localhost:${config.port}`)
    })
  }
}

export default Server
