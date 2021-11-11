const express = require('express')
const { sequelize } = require('./models')
const { route } = require('./routes')
const cors = require('cors');

const app = express()
const port = 4000

// middleware enables cors
app.use(cors({
    origin: 'http://localhost:3000'
}));
route(app)
app.listen(port, async () => {
    // create a connection to the database
    await sequelize.authenticate();
    console.log("Database Connected!")
    console.log(`Backend is listening in port ${port}!`)
})
