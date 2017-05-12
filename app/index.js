const express = require('express')  
const bodyParser = require('body-parser')

const app = express()  
const port = 3000

const pg = require('pg')  
const conString = 'postgres://postgres:12345678@localhost/ph_data'

const readings = []

app.use(bodyParser.json());

app.post('/ph_data', function (req, res, next) {  
    // retrieve user posted data from the body
    const reading = req.body
    
  	pg.connect(conString, function (err, client, done) {
	    if (err) {
	      // pass the error to the express error handler
	      return next(err)
	    }
	    client.query('INSERT INTO readings (time_stamp, ph) VALUES ($1, $2);', [reading.time_stamp, reading.ph], function (err, result) {
	    	done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

	      	if (err) {
	        	// pass the error to the express error handler
	        	return next(err)
	      	}

	      	res.sendStatus(200)
		})
	})
})


app.get('/ph_data', function (req, res) {  
    // retrieve user posted data from the body
    res.json({
    readings: readings
  })
})


app.listen(port)
