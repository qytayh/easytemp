'use strict'
const exec = require('child_process').exec
const co = require('co')
const Prompt = require('inquirer')
const config = require('../template.json')
const chalk = require('chalk')
const initQuestions = [
    {
        type: 'list',
        name: 'tplName',
        message: '请选择模板类型',
        choices: [
            'vue3+ts',
            'koa2+ts',
        ]
    },
    {
        type: 'input',
        name: "projectName",
        message: "请输入项目名称"
    }
];


module.exports = () => {
    co(function* () {
        // 处理用户输入
        Prompt.prompt(initQuestions).then(result => {
            let { tplName, projectName } = result
            if (!config.tpl[tplName]) {
                console.log(chalk.red('\n × Template does not support!'))
                process.exit()
            }
            let gitUrl = config.tpl[tplName].url
            let branch = config.tpl[tplName].branch
            let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName} && cd ${projectName}`
            console.log(chalk.blue('Begin generation, please wait ...'))
            exec(cmdStr, (error, stdout, stderr) => {
                if (error) {
                    console.log(chalk.red(error))
                    process.exit()
                }
                console.log(chalk.green('\n √ Generation completed!'))
                console.log(`\n cd ${projectName} && npm install \n`)
                process.exit()
            })
        })
    })
}