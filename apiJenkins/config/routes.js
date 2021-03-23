const express = require('express')
module.exports = function (server) {

    const router = express.Router()
    server.use('/api', router)

    const jobService = require('../api/job/jobService')
    jobService.register(router, '/job')
}
