//IMPORTS
const express = require('express');
const cors = require('cors')
const app = express()


//MISC
const PORT = process.env.PORT || 5000


//MIDDLEWARE
app.use(cors())
app.use(express.json())


//ROUTES
app.use('/user', require('./api/user'))

app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}...`)
})