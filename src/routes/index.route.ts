import { Router } from 'express'

const buscadoRoute = Router()

buscadoRoute.get('/', (req, res) =>
  res.send('Hello World!')
)

export default buscadoRoute
