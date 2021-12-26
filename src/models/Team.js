const mongoose = require('mongoose')
const Joi = require('Joi')

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
})

const Team = mongoose.model('Team', teamSchema)

function validateTeam(team) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  })

  return schema.validate(team)
}

exports.Team = Team
exports.validate = validateTeam

