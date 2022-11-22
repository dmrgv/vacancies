import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import ErrorMiddleware from './Middlewares/ErrorMiddleware.js'

dotenv.config()

const PORT = process.env.SERVER_PORT
const DB_URL = `mongodb://${process.env.DB_HOST}/hr`

const app = express()

app.use(express.json())
app.use('/v1', router)
app.use(ErrorMiddleware)

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
  } catch (e) {
    console.log(e)
  }
}

startApp()
