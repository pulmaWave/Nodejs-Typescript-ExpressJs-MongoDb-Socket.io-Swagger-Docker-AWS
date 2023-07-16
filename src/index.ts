import express from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import swaggerDocs from './utils/swagger'

const app = express()
const PORT = 4000

app.use(express.json())

app.use('/users', usersRouter)
databaseService.connect()
swaggerDocs(app, PORT)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
