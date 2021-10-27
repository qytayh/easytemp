#!/usr/bin/env node --harmony

'use strict'

process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

program
    .version(require('./package').version, '-v, --version')

program
    .usage('<command>')
program
    .command('init')
    .description('Generate a new project')
    .alias('i')
    .action(() => {
        require('./src/init.js')()
    })

program.parse(process.argv)