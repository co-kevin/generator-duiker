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
    answers.nameCases = this._nameCase(answers.name)
    answers.groupCases = this._groupCase(answers.group)
    console.log(answers)
    
    this._copyStaticFiles()
    this._copyTplJava(answers)
    // this._copyTplYml(answers)
  }

  // 基于用户输入的 name 变种: ocr bill
  _nameCase (name) {
    const kebab = _string.kebabCase(name)
    return {
      // 首字母大写驼峰写法
      hump: _string.upperFirst(_string.camelCase(name)),
      // 字母小写，单词间横线分割
      kebab,
      // 字母小写，单词间 . 分割
      splitByDot: kebab.split('-').join('.'),
      // 字母小写，单词间 / 分割
      splitBySlash: kebab.split('-').join('/'),
    }
  }

  // 基于用户输入的 group 变种: com.zdan91
  _groupCase (group) {
    return {
      // 字母小写，单词间 / 分割
      splitBySlash: group.split('\.').join('/'),
    }
  }

  _copyTplJava(data) {
    this.fs.copyTpl(this.templatePath('src/main/java/package/_Application.java')
      , this.destinationPath(`src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}/${data.nameCases.hump}Application.java`), data)
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
    this.fs.copyTpl(this.templatePath('_build.gradle')
    , this.destinationPath(`build.gradle`), {})
  }
}

function run () {
  this.fs.copyTpl(this.templatePath('_build.gradle'), this.destinationPath(`build.gradle`))
  this.fs.copyTpl(this.templatePath('gradle/wrapper/gradle-wrapper.jar'), this.destinationPath(`gradle/wrapper/gradle-wrapper.jar`))
  this.fs.copyTpl(this.templatePath('gradle/wrapper/gradle-wrapper.properties'), this.destinationPath(`gradle/wrapper/gradle-wrapper.properties`))
}