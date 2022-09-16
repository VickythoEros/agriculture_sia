const serverSideRouter = require('express').Router()
const sse = require('../serverSideEvent')

serverSideRouter.get('/stream-events/',sse.init)

module.exports = serverSideRouter