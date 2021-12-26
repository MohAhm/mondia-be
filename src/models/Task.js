const mongoose = require('mongoose')
const Joi = require('Joi')

const logsSchema = new mongoose.Schema({
  employeeCode: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee'
  },
  logedTime: {
    type: String,
    required: true,
  },
  logStartDate: {
    type: Date,
    required: true,
  }
})

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  code: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  project: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  logs: {
    type: [ logsSchema ],
    required: true,
  }
})

const Task = mongoose.model('Task', taskSchema)

function validateTask(task) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    code: Joi.string().min(5).required(),
    description: Joi.string().min(0).required(),
    project: Joi.string().min(0).required(),
    logs: Joi.array().items(
      Joi.object({
        employeeCode: Joi.string().min(0).required(),
        logedTime: Joi.string().required(),
        logStartDate: Joi.string().required()
      })
    ).required()
  })

  return schema.validate(task)
}

exports.Task = Task
exports.validate = validateTask