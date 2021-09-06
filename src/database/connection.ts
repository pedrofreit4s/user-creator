import { createConnection } from 'typeorm'

function openDatabaseConnection(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    createConnection()
      .then(() => {
        console.log('- Connection established with database')
        resolve(true)
      })
      .catch((e) => {
        console.log('- Error connecting to database')
        console.log(e)
        reject(false)
      })
  })
}

export { openDatabaseConnection }
