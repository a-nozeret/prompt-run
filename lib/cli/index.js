#!/usr/bin/env node
const cli = require('./bootstrap')
const promptRun = require('../index')

module.exports = promptRun({ command: cli.input, options: cli.flags, pkg: cli.pkg })
