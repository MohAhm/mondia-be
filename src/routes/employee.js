const express = require('express')
const mongoose = require('mongoose')
const { Employee, validate } = require('../models/Employee')

const employeeRouter = express.Router()

employeeRouter.get('/', async (req, res) => {
  const employees = await Employee.find()
  res.send(employees)
})

employeeRouter.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  if (!mongoose.Types.ObjectId.isValid(req.body.teamId)) {
    return res.status(400).send("Invalid team ID.");
  }

  const employee = new Employee({ 
    name: req.body.name,
    joinDate: req.body.joinDate,
    teamCode: req.body.teamId,
    skills: req.body.skills
   })
  await employee.save()

  res.send(employee)
})

employeeRouter.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  if (!mongoose.Types.ObjectId.isValid(req.body.teamId)) {
    return res.status(400).send("Invalid team ID.");
  }

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    { 
      name: req.body.name,
      joinDate: req.body.joinDate,
      teamCode: req.body.teamId,
      skills: req.body.skills
    },
    { new: true }
  )

  if (!employee) {
    return res.status(404).send("The employee with the given ID was not found.");
  }

  res.send(employee)
})

employeeRouter.delete('/:id', async (req, res) => {
  const employee = await Employee.findByIdAndRemove(req.params.id)

  if (!employee) {
    return res.status(404).send("The employee with the given ID was not found.")
  }

  res.send(employee)
})

employeeRouter.get('/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id).select('-__v')

  if (!employee) {
    return res.status(404).send("The employee with the given ID was not found.")
  }

  res.send(employee)
})

module.exports = employeeRouter