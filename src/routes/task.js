const express = require('express')
const { Task, validate } = require('../models/Task')

const taskRouter = express.Router()

taskRouter.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.send(tasks)
})

taskRouter.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  const tasks = new Task({ 
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    project: req.body.project,
    logs: req.body.logs.map((log) => {
      return {
        employeeCode: log.employeeCode,
        logedTime: log.logedTime,
        logStartDate: log.logStartDate
      }
    })
  })
  await tasks.save()

  res.send(tasks)
})

taskRouter.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const tasks = await Task.findByIdAndUpdate(
    req.params.id,
    { 
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
      project: req.body.project,
      logs: req.body.logs.map((log) => {
        return {
          employeeCode: log.employeeCode,
          logedTime: log.logedTime,
          logStartDate: log.logStartDate
        }
      })
    },
    { new: true }
  )

  if (!tasks) {
    return res.status(404).send("The task with the given ID was not found.");
  }

  res.send(tasks)
})

taskRouter.delete('/:id', async (req, res) => {
  const tasks = await Task.findByIdAndRemove(req.params.id)

  if (!tasks) {
    return res.status(404).send("The task with the given ID was not found.")
  }

  res.send(tasks)
})

module.exports = taskRouter