const express = require('express')  
const bodyParser = require('body-parser')

const app = express()  
const port = 3000

const readings = []

app.use(bodyParser.json());

app.post('/ph_data', function (req, res) {  
    // retrieve user posted data from the body
    const reading = req.body
    readings.push({
      time: reading.time,
      ph: reading.ph
    })
    res.send('successfully registered')
})

app.get('/ph_data', function (req, res) {  
    // retrieve user posted data from the body
    res.json({
    readings: readings
  })
})



app.listen(port)  