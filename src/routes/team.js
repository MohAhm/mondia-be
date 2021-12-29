const express = require('express')
const { Team, validate } = require('../models/Team')

const teamRouter = express.Router()

teamRouter.get('/', async (req, res) => {
  const teams = await Team.find()
  res.send(teams)
})

teamRouter.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const team = new Team({ 
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
   })
  await team.save()

  res.send(team)
})

teamRouter.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const team = await Team.findByIdAndUpdate(
    req.params.id,
    { 
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    },
    { new: true }
  )

  if (!team) {
    return res.status(404).send("The team with the given ID was not found.");
  }

  res.send(team)
})

teamRouter.delete('/:id', async (req, res) => {
  const team = await Team.findByIdAndRemove(req.params.id)

  if (!team) {
    return res.status(404).send("The team with the given ID was not found.")
  }

  res.send(team)
})

teamRouter.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).select('-__v')

  if (!team) {
    return res.status(404).send("The Team with the given ID was not found.")
  }

  res.send(team)
})

module.exports = teamRouter