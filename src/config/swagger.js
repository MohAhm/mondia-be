
const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Mondia API',
    description: 'Frontend Developer Task',
  },
  host: 'localhost:3900',
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)