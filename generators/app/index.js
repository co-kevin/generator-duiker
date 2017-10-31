const Generator = require('yeoman-generator')
const _string = require('lodash/string')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'group',
      message : 'Your project group',
      default : this.appgroup, // Default to current folder name
      store   : true
    }, {
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname, // Default to current folder name
      store   : true
    }]).then((answers) => {
      this._run(answers)
    })
  }

  // callback when answered
  _run (answers) {
    answers.packagePath = answers.group.replace('\.', '/')
    answers.nameUpperFirst = _string.upperFirst(answers.name)
    
    this._copyStaticFiles()
    this._copyTplJava(answers)
    this._copyTplYml(answers)
  }

  _copyTplJava(data) {
    this.fs.copyTpl(this.templatePath('src/main/java/package/_Application.java')
      , this.destinationPath(`src/main/java/${data.packagePath}/${data.name}/${data.nameUpperFirst}Application.java`), data)
  }

  _copyTplYml(data) {
    this.fs.copyTpl(this.templatePath('src/main/resources/_application.yml')
      , this.destinationPath(`src/main/resources/application.yml`), data)
  }

  _copyStaticFiles() {
    let files = [
      'gradle/wrapper/gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.properties',
      '.editorconfig',
      '.gitignore',
      'gradlew',
      'gradlew.bat'
    ]

    for (let file of files) {
      this.fs.copy(this.templatePath(file), this.destinationPath(file))
    }
  }
}

function run () {
  this.fs.copyTpl(this.templatePath('_build.gradle'), this.destinationPath(`build.gradle`))
  this.fs.copyTpl(this.templatePath('gradle/wrapper/gradle-wrapper.jar'), this.destinationPath(`gradle/wrapper/gradle-wrapper.jar`))
  this.fs.copyTpl(this.templatePath('gradle/wrapper/gradle-wrapper.properties'), this.destinationPath(`gradle/wrapper/gradle-wrapper.properties`))
}