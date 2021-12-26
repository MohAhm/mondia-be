const mongoose = require('mongoose')
const Joi = require('Joi')

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  joinDate: {
    type: Date,
    required: true
  },
  skills: {
    type: [ String ],
    required: true
  },
  teamCode: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  },
})

const Employee = mongoose.model('Employee', employeeSchema)

function validateEmployee(employee) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    joinDate: Joi.string().required(),
    teamId: Joi.string().min(0).required(),
    skills: Joi.array().required()
  })

  return schema.validate(employee)
}

exports.Employee = Employee
exports.validate = validateEmployee

