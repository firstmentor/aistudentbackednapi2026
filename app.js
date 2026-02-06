const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDB = require('./db/connectDB')
const cookieParser = require('cookie-parser')
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://aistudentbackednapi2026.onrender.com"
  ],
  credentials: true
}));


//connect db
connectDB()
app.use(cookieParser()) //token get

//data get json
app.use(express.json())






//route load localhost:3000/api
app.use('/api', web)

app.listen(port, () => {
  console.log(`server start localhost:${port}`)
})