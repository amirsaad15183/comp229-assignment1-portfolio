import express from 'express'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import qualificationRoutes from './routes/qualification.routes.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDistPath = path.resolve(__dirname, '../client/dist')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', qualificationRoutes)

app.use(express.static(clientDistPath))

app.get(/^\/(?!api|auth).*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: `${err.name}: ${err.message}` })
  } else if (err) {
    res.status(400).json({ error: `${err.name}: ${err.message}` })
    console.log(err)
  }
})
export default app

