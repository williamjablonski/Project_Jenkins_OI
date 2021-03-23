const restful = require('node-restful')
const mongoose = restful.mongoose

// const parametrosSchema = new mongoose.Schema({
//   type: {
//     type: String
//   },
//   value: {
//     type: String
//   },
//   obs: {
//     type: String
//   },
//   default: {
//       type: String
//   }
// })

const jobSchema = new mongoose.Schema({
    rec: {
        type: Boolean
      },
    jobName: {
        type: String
      },
    description: {
    type: String
    },
    tagName: {
        type: String
    },
    
    os: {
        type: Array
      },
    parametros: {
        type: Array
      },
    // parametros: [parametrosSchema]
})


const osSchema = new mongoose.Schema({
linux: Boolean,
windows: Boolean
})






module.exports = restful.model('job', jobSchema)