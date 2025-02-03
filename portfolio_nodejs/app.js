const connectDb = require('./config/dbConnection')
require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')

// app conect to express
const app = express()

// database connection
connectDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', express.static(path.join(__dirname, './uploads')))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))


const PORT = process.env.PORT || 4040

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
