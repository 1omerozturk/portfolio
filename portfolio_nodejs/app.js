require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const firebase = require('./config/firebase')

const app = express()

app.disable('x-powered-by')
if (process.env.TRUST_PROXY_HOPS) {
  const hops = Number(process.env.TRUST_PROXY_HOPS)
  if (Number.isSafeInteger(hops) && hops >= 0 && hops <= 10) app.set('trust proxy', hops)
}
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean)
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }))
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff')
  if (req.path.startsWith('/api/admin')) res.set('Cache-Control', 'no-store')
  next()
})
app.use(express.json({ limit: '256kb' }))
app.use(express.urlencoded({ extended: false, limit: '256kb', parameterLimit: 100 }))

app.use('/api/uploads', express.static(path.join(__dirname, './uploads')))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)
  const status = error.type === 'entity.too.large' ? 413 : error instanceof SyntaxError && error.status === 400 ? 400 : 500
  res.status(status).json({ message: status === 413 ? 'İstek çok büyük.' : status === 400 ? 'Geçersiz JSON.' : 'İşlem tamamlanamadı.' })
})

const PORT = process.env.PORT || 5040

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  if(firebase.databaseId){
    console.log("Database connected.")
  }
})



