module.exports = class {
  constructor(generator) {
    this.generator = generator
  }

  // 询问连接 MySQL 参数
  askConnection() {
    return new Promise((resolve, reject) => {
      const questions = [{
        type: 'input',
        name: 'mysqlURL',
        message: 'Enter your MySQL URL',
        default: this.mysqlURL,
        store: true
      }]
      this.generator.prompt(questions).then((answers) => {
        resolve(answers.mysqlURL)
      })
    })
  }

  // 询问 database
  askDB() {
    const selectDBQuestion = [
      {
        type: 'checkbox',
        name: 'tables',
        message: 'Choices your DB',
        choices: ['db1', 'db2']
      }
    ]
  }

  // 询问 tables
  askTables() {

  }
}
