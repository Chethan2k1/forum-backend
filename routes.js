const express = require('express')
const { loginHandler } = require('./controllers/login')
const { registerHandler } = require('./controllers/register')
const { createpostHandler } = require('./controllers/createpost')
const { showpostsHandler } = require('./controllers/showposts')
const { getpostHandler } = require('./controllers/fetchpost')
const { jwtverify } = require('./middleware/auth')

module.exports = {
    route: (app) => {
        // middleware ensures that only json payload requests pass through and de-serializes the json to Javascript Object
        app.use(express.json())
        app.post('/login', loginHandler)
        app.post('/register', registerHandler)
        app.get('/posts', showpostsHandler)
        app.get('/post', getpostHandler)
        // routes here after need authorization
        app.use(jwtverify)
        app.post('/createpost', createpostHandler)
    }
}