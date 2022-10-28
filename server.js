const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')

// Parse application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

//  Panggil routes
const routes = require('./routes')
routes(app)


// Daftarkan menu routes dari index
app.use('/auth', require('./middleware'))


app.listen(3000, () => {
    console.log(`Server started on http://localhost:3000`)
})