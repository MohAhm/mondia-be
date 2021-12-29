function timestamp() {
  // sometime in the last 180 days
  const stampy = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 180)
  return new Date(stampy).toISOString()
}

function taskCode() {
  return Math.random().toString(36).substring(2,7)
}

const teamData = [
  {
    name: 'Frontend',
    startDate: '2021-01-16',
    endDate: '2021-04-01'
  },
  {
    name: 'Backend',
    startDate: '2021-01-20',
    endDate: '2021-03-15'
  },
  {
    name: 'UX Designer',
    startDate: '2021-02-01',
    endDate: '2021-06-06'
  },
  {
    name: 'Data Scientist',
    startDate: '2021-04-10',
    endDate: '2021-10-15'
  },
  {
    name: 'Data Engineer',
    startDate: '2021-08-05',
    endDate: '2021-12-22'
  },  
]

const employeeData = [
  {
    name: 'Ben Adam',
    joinDate: timestamp(),
    skills: ['javascript', 'node', 'database']
  },
  {
    name: 'Val Head',
    joinDate: timestamp(),
    skills: ['html', 'css', 'javascript', 'react']
  },
  {
    name: 'Dan Abramov',
    joinDate: timestamp(),
    skills: ['sass', 'javascript', 'vue']
  },
  {
    name: 'Bonnie Eisenman',
    joinDate: timestamp(),
    skills: ['java', 'spring']
  },
  {
    name: 'Alex Anderson',
    joinDate: timestamp(),
    skills: ['python', 'sql', 'database']
  },
  {
    name: 'Pete Hunt',
    joinDate: timestamp(),
    skills: ['ux', 'figma']
  },
  {
    name: 'Sarah Drasner',
    joinDate: timestamp(),
    skills: ['vue', 'styled-components']
  },
  {
    name: 'Jed Watson',
    joinDate: timestamp(),
    skills: ['typescript']
  },
  {
    name: 'Richard Feldman',
    joinDate: timestamp(),
    skills: ['javascript', 'node']
  },
  {
    name: 'Ean Platter',
    joinDate: timestamp(),
    skills: ['javascript', 'node']
  },
]

const taskData = [
  {
    name: 'Center Button',
    code: taskCode(),
    description: 'Centering the login button.',
    project: 'Login page',
    logs: [
      {
        logedTime: "10:00",
        logStartDate: timestamp()
      }
    ]
  },
  {
    name: 'User API',
    code: taskCode(),
    description: 'Create user api endpoints.',
    project: 'Authentication user',
    logs: [
      {
        logedTime: "12:00",
        logStartDate: timestamp()
      },
      {
        logedTime: "12:00",
        logStartDate: timestamp()
      },
      {
        logedTime: "16:00",
        logStartDate: timestamp()
      }
    ]
  },
  {
    name: 'Dashboard Footer',
    code: taskCode(),
    description: 'Add footer to each page in the dashboard.',
    project: 'Dashboard',
    logs: []
  }
]

exports.teamData = teamData
exports.employeeData = employeeData
exports.taskData = taskData
