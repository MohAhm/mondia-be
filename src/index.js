const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')

const employeeRouter = require('./routes/employee')
const taskRouter = require('./routes/task')
const teamRouter = require('./routes/team')

const swaggerFile = require('../swagger-output.json')
const { DATABASE_URL, PORT } = require('./config/constants')

const app = express()
app.use(express.json())
require("./config/cors")(app)
app.use('/api/teams', teamRouter)
app.use('/api/employees', employeeRouter)
app.use('/api/tasks', taskRouter)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = PORT || 3900
const databaseURL = DATABASE_URL || ''

mongoose.connect(databaseURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err))

app.listen(port, () => console.log(`Listening on port ${port}...`))