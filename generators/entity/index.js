const Generator = require('yeoman-generator')
const Question = require('./question')
const Connection = require('./connection')
const Model = require('./model')
const _string = require('lodash/string')
const _utils = require('../utils')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)
  }

  async prompting() {
    const question = new Question(this)
    const project = await question.askProjectInfo()
    const mysqlURL = await question.askConnection()
    this.connection = new Connection(mysqlURL)
    this.connection.createConnection()
    const tables = await this.connection.showTables()
    if (0 === tables.length) {
      console.warn('Table list is empty. Please create table before generate!')
      process.exit(1)
    }
    const answerTables = await question.askTables(tables)
    this._run(project, answerTables)
    // this.connection.close()
  }

  async _run(project, tables) {
    const nameCases = _utils.nameCase(project.name)
    const groupCases = _utils.groupCase(project.group)

    for (const table of tables) {
      const columns = await this.connection.queryColumns(table)
      const tableComment = await this.connection.queryTableComment(table)
      const ddl = await this.connection.queryDDL(table)
      new Model(this, table, tableComment, columns, ddl, nameCases, groupCases).create()
    }

    this.connection.close()
  }
}
