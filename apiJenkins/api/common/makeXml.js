var XMLWriter = require('xml-writer');
const fs = require('fs');
const replace = require('replace-in-file');
// import { promises as fs } from 'fs';
        async function makeXml(content) {
            var job  = content
            // console.log(job)
            xw = new XMLWriter;
            xw.startDocument();
            xw.startElement('flow-definition');
            xw.writeAttribute('plugin', 'workflow-job@2.40');
            xw.startElement('actions');
            xw.endElement('actions');
            //DESCRICAO DO JOB
            if(job.description){
                xw.startElement('description');
                xw.text(job.description);
                xw.endElement('description');
            }
            xw.startElement('keepDependencies');
            xw.text('false');
            xw.endElement('keepDependencies');
            //PARAMETROS DO JOB - Properties
            if(job.parametros){
                xw.startElement('properties');
            
                xw.startElement('hudson.model.ParametersDefinitionProperty');
                xw.startElement('parameterDefinitions');
                job.parametros.forEach(parametro => {
                    if(parametro.tipo =="string"){
                        // COMEÇO DO ELEMENTO -  STRING
                        xw.startElement('hudson.model.StringParameterDefinition');
                        xw.startElement('name');
                        xw.text(parametro.val);
                        xw.endElement('name');
                        if(parametro.obs){
                            xw.startElement('description');
                            xw.text(parametro.obs);
                            xw.endElement('description');
                        }
                        
                        if(parametro.def){
                            xw.startElement('defaultValue');
                            xw.text(parametro.def);
                            xw.endElement('defaultValue');
                        }
                        xw.startElement('trim');
                        xw.text('false');
                        xw.endElement('trim');
                        xw.endElement('hudson.model.StringParameterDefinition');
                        // FIM DO ELEMENTO
                    }
                    if(parametro.tipo =="escolha"){
                        // COMEÇO DO ELEMENTO -  ESCOLHA - Choice
                        xw.startElement('hudson.model.ChoiceParameterDefinition');
                        
                        xw.startElement('name');
                        xw.text(parametro.val);
                        xw.endElement('name');
                        if(parametro.obs){
                            xw.startElement('description');
                            xw.text(parametro.obs);
                            xw.endElement('description');
                        }
                       
                        
                        xw.startElement('choices');
                        xw.writeAttribute('class', 'java.util.Arrays$ArrayList');
                        xw.startElement('a');
                        xw.writeAttribute('class', 'string-array');
                        // FOR AQUI PARA CRIAR TODAS AS OPÇÕES
                        var list = parametro.def.split(",");
                        list.forEach(el => {
                            var item =  el.trim()
                            xw.startElement('string');
                            xw.text(item);
                            xw.endElement('string');
                           
                        })
                        //FECHA O FOR
                        xw.endElement('a');
                        xw.endElement('choices');
                        xw.endElement('hudson.model.ChoiceParameterDefinition');
                        // FIM DO ELEMENTO
                    }
                });
               
                xw.endElement('parameterDefinitions');
                xw.endElement('hudson.model.ParametersDefinitionProperty');
                xw.endElement('properties');
            }
            
            // FIM DAS PROPRIEDADES
            xw.startElement('definition');
            xw.writeAttribute('class', 'org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition');
            xw.writeAttribute('plugin', 'workflow-cps@2.89');
            //INICIO DO SCRIPT
            xw.startElement('script');
            var script = fs.readFileSync(__dirname + '/script', "utf8",async function(err, data) {
                if(err){
                    console.log('nao leu o arquivo', err)
                    return  
                }else{
                    return  await data
                }
               
            })
            var xmlConfig = script
            xmlConfig = xmlConfig.replace("{{nameJob}}", job.jobName)
            xmlConfig = xmlConfig.replace("{{jobStage}}", job.jobName)
            if(job.os.linux && job.os.windows){
                xmlConfig = xmlConfig.replace("{{OSLabel}}", "label 'vmLinux';\n label 'vmIBM';")
                var win = ''
                var lin = ''
                if(job.parametros){
                    job.parametros.forEach(param =>{
                        win  = win.concat(`-v ${param.val}:%${param.val}% `)
                        lin = lin.concat("-v " + param.val+":"+"'${"+param.val+"}' ")
                    })
                    xmlConfig = xmlConfig.replace("{{windowsScript}}", `-i ${job.tagName} ${win}`)
                    xmlConfig = xmlConfig.replace("{{linuxScript}}", `-i ${job.tagName} ${lin}`)
                }else{
                    xmlConfig = xmlConfig.replace("{{windowsScript}}", `-i ${job.tagName} `)
                    xmlConfig = xmlConfig.replace("{{linuxScript}}", `-i ${job.tagName} `)
                }

            }else if(job.os.linux){
                xmlConfig = xmlConfig.replace("{{OSLabel}}", "label 'vmLinux';")
                var lin = ''
                if(job.parametros){
                    job.parametros.forEach(param =>{
                        lin = lin.concat("-v " + param.val+":"+"'${"+param.val+"}' ")
                    })
                    xmlConfig = xmlConfig.replace("{{linuxScript}}", `-i ${job.tagName} ${lin}`)
                }else{
                    xmlConfig = xmlConfig.replace("{{linuxScript}}", `-i ${job.tagName} `)
                }

            }else if(job.os.windows){
                xmlConfig = xmlConfig.replace("{{OSLabel}}", "label 'vmIBM';")
                var win = ''
                if(job.parametros){
                    job.parametros.forEach(param =>{
                        win  = win.concat(`-v ${param.val}:%${param.val}% `)
                    })
                    xmlConfig = xmlConfig.replace("{{windowsScript}}", `-i ${job.tagName} ${win}`)
                }else{
                    xmlConfig = xmlConfig.replace("{{windowsScript}}", `-i ${job.tagName} `)
                }

            }
            await xw.text(xmlConfig);
            xw.endElement('script');
            // FIM DO SCRIPT
            xw.startElement('sandbox');
            xw.text('true');
            xw.endElement('sandbox');
            xw.endElement('definition');
            xw.startElement('triggers');
            xw.endElement('triggers');
            xw.startElement('disabled');
            xw.text('false');
            xw.endElement('disabled');
            xw.endElement('flow-definition');
            var stringXML = await xw.toString().replace('<?xml version="1.0"?>',' ')

         return await stringXML.replace(/\s+/g, ' ').trim()
        }

module.exports = makeXml