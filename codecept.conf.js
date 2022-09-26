/** @type {CodeceptJS.MainConfig} */
exports.config = {
  endpoints:{
    athletes: '/athletes',
    games: '/games',
  },  
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'http://localhost:3000',
      timeout: 30000
    },
    restHelper:{
      require: './helpers/rest_helper.js'
    },
    functions:{
      require: './helpers/functions.js'
    },
  },
  include: {
    I: './steps_file.js'
  },
  name: 'ocs-api'
}