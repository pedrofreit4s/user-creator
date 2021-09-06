import 'reflect-metadata'
import { openDatabaseConnection } from './database/connection'
import { server } from './server'
import { pagination } from 'typeorm-pagination'
import { routes } from './routes'

openDatabaseConnection().then(() => {
  server.use(pagination)
  server.use(routes)

  server.listen(3040, () =>
    console.log('- Server started and running on port 3040')
  )
})
