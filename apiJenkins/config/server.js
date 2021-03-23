const port = 3005
const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')
server.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))
server.use(bodyParser.json({
    limit: '50mb'
}))
server.use(allowCors)
server.use(queryParser())
server.listen(process.env.PORT || 3005 , function() {
    console.log(`Jenkins API: Running on port ${port}`)
})
module.exports = server
