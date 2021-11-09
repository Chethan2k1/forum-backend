const express = require('express')
const { loginHandler } = require('./controllers/login')
const { registerHandler } = require('./controllers/register')

module.exports = {
    route: (app) => {
        // middleware ensures that only json payload requests pass through and de-serializes the json to Javascript Object
        app.use(express.json())
        app.post('/login', loginHandler)
        app.post('/register', registerHandler)
    }
}