/**
 * Prompt questions.
 *
 * @link https://github.com/SBoudrias/Inquirer.js#documentation
 * @author hookszhang
 */
module.exports = class {

  /**
   * Require Yeoman Generator instance.
   *
   * @param {*yeoman-generator} generator
   */
  constructor(generator) {
    this.generator = generator
  }

  /**
   * Ask the project info.
   * Project group, sample: com.zdan91
   * Project name, sample: ocr bill
   */
  askProjectInfo() {
    const questions = [{
      type: 'input',
      name: 'group',
      message: 'Your project group',
      default: this.appgroup, // Default to current folder name
      store: true
    }, {
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname, // Default to current folder name
      store: true
    }]
    return new Promise((resolve, reject) => {
      this.generator.prompt(questions).then((answers) => {
        resolve(answers)
      })
    })
  }

  /**
   * Ask the user MySQL connection URL.
   * URL format: mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700
   */
  askConnection() {
    const questions = [{
      type: 'input',
      name: 'mysqlURL',
      message: 'Enter your MySQL URL',
      default: this.mysqlURL,
      store: true
    }]
    return new Promise((resolve, reject) => {
      this.generator.prompt(questions).then((answers) => {
        resolve(answers.mysqlURL)
      })
    })
  }

  /**
   * Ask the user to generate the entity from which tables.
   * Multiple choices.
   *
   * @param {*Array} tables
   */
  askTables(tables) {
    const questions = [{
      type: 'checkbox',
      name: 'tables',
      message: 'From which tables to generate the entities',
      choices: tables
    }]
    return new Promise((resolve, reject) => {
      this.generator.prompt(questions).then((answers) => {
        resolve(answers.tables)
      })
    })
  }
}
