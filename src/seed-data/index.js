require('dotenv/config')
const mongoose = require('mongoose')

const { Team } = require('../models/Team')
const { Employee } = require('../models/Employee')
const { Task } = require('../models/Task')
const { teamData, employeeData, taskData } = require('./data')

const databaseURL = process.env.DATABASE_URL || ''

async function getRandomRecordId(model) {
  const count = await model.count().exec()
  const random = Math.floor(Math.random() * count)  
  const { _id } = await model.findOne().skip(random).exec()
  return _id
}

function getLogsWithEmployeeId(logs) {
  const promises = logs.map(async (log) => {
    return {
      employeeCode: await getRandomRecordId(Employee),
      logedTime: log.logedTime,
      logStartDate: log.logStartDate
    }
  });

  return Promise.all(promises);
}

async function seed() {
  console.log('🌱 Inserting seed data')

  mongoose.connect(databaseURL)

  await Task.deleteMany({})
  await Employee.deleteMany({})
  await Team.deleteMany({})

  for (let team of teamData) {
    await new Team(team).save()
  }
  console.log('Adding teams...')

  for (let employee of employeeData) {
    await new Employee({
      ...employee,
      teamCode: await getRandomRecordId(Team)
    }).save()
  }
  console.log('Adding employees...')

  for (let task of taskData) {
    const { logs } = task
    await new Task({
      ...task,
      logs: await getLogsWithEmployeeId(logs)
    }).save()
  }
  console.log('Adding tasks...')

  mongoose.disconnect()

  console.log('✅ Seed data inserted');
  console.log('👋 Please start the process with \`npm start\`');
}

seed()