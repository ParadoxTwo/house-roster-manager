//imports
const express = require('express');
const cors = require('cors')
const app = express()

//misc
const PORT = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())

app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}...`)
})