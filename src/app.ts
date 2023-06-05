import 'express-async-errors'
import { handleErrors } from './errors'
import express, { Application } from 'express'
import userRoutes from './routers/users.routes'
import loginRoutes from './routers/login.routes'
import advertisementRoutes from './routers/advertisements.routes'

const app: Application = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', loginRoutes)
app.use('/advertisement', advertisementRoutes)

app.use(handleErrors)

export default app