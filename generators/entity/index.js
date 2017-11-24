const Generator = require('yeoman-generator')
const _string = require('lodash/string')
const Question = require('./question')
const Connection = require('./connection')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)
  }

  async prompting() {
    const question = new Question(this)
    const mysqlURL = await question.askConnection()
    this.connection = new Connection(mysqlURL)
    this.connection.createConnection()
    const tables = await this.connection.showTables()
    if (0 === tables.length) {
      console.warn('Table list is empty. Please create table before generate!')
      process.exit(1)
    }
    const answerTables = await question.askTables(tables)
    console.log(answerTables)
    // this.connection.close()
  }

  _run(answers) {
    answers.nameCases = this._nameCase(answers.name)
    answers.groupCases = this._groupCase(answers.group)
    this._createConnection(answers)
    this._copy(answers)
  }

  async _copy(answers) {
    try {
      const columns = await this._queryColumns(answers.database, answers.tableName)
      const tableComment = await this._queryTableComment(answers.database, answers.tableName)
      const ddl = await this._queryDDL(answers.tableName)
      this._closeConnection()
      this._copyModel(columns, answers.tableName, tableComment, answers.nameCases, answers.groupCases)
      this._copyLiquibaseChangelog(answers.tableName, ddl)
    } catch (e) {
      throw e
    }
  }
}
