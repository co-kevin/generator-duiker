const Generator = require('yeoman-generator')
const _string = require('lodash/string')
const Project = require('./project')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  prompting() {
    return this.prompt([{
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
    }, {
      type: 'input',
      name: 'port',
      message: 'Your project port',
      default: this.appport, // Default to current folder name
      store: true
    }]).then((answers) => {
      this._run(answers)
    })
  }

  // callback when answered
  _run(answers) {
    new Project(this, answers).create()
  }
}
