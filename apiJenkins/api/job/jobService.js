const Job = require('./job')
const _ = require('lodash')
const asyncHandler = require('express-async-handler')
var make = require('../common/makeXml');
const consts = require('../../config/consts')
Job.methods(['get', 'post', 'put', 'delete'])

var jenkins = require('jenkins')({
    baseUrl: consts.urlJenkins, 
    crumbIssuer: consts.crumbIssuer 
 });
Job.updateOptions({
    new: true,
    runValidators: true
})
Job.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle
    if (bundle.errors) {
        var errors = parseErrors(bundle.errors)
        res.status(500).json({
            errors
        })
    } else {
        next()
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = []
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors
}

Job.route('createJob', asyncHandler(async(req, res) => {
    var job =req.body
    var jobDB = new Job(job)
    var xmlData = await make(job)
    jenkins.job.exists(job.jobName, function(err, exists) {
        if(!exists){
          jenkins.job.create(job.jobName, xmlData, function(err) {
            if(err){
            var response = {status: 'erro', result: err};
            res.json(response);
            }else{
            var response = {status: 'sucesso', result: 200};
            jobDB.save(err => {
              if (err) {
                  console.log(err)
              }
            })
            res.json(response);
            }
           })
        }else{
          var response = {status: 'exists', result: 'Job existente'};
          res.json(response);
        }
     })
}))

Job.route('restoreAllJobs',(req, res) => {
    Job.find().lean().exec(asyncHandler(async function  (error, value)  {
        value.forEach(async (job)=>{
            var xmlData = await make(job)
            var status = await createJob(job, xmlData)
            console.log(status)
        })
        res.json(value)
       res.end()
   }))
})

function createJob (job, xml){
    jenkins.job.create(job.jobName, xml, function(err) {
        if (err){
            console.log(err)
        } ;
      });
}




module.exports = Job