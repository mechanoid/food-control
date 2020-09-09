#!/usr/bin/env node

import app from '../index.js'

const config = {
  port: process.env.PORT
}

const server = app(config).listen(config.port, () => {
  console.log(`listening to port: http://localhost:${server.address().port}`)
})
