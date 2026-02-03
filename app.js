const express = require('express')
const app = express()
const port = 3000
const web  = require('./routes/web')
const connectDB = require('./db/connectDB')

//connect db
connectDB()

//data get json
app.use(express.json())






//route load localhost:3000/api
app.use('/api',web)

app.listen(port, () => {
  console.log(`server start localhost:${port}`)
})