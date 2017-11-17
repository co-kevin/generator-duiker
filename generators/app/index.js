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
    }]).then((answers) => {
      this._run(answers)
    })
  }

  // callback when answered
  _run(answers) {
    answers.nameCases = this._nameCase(answers.name)
    answers.groupCases = this._groupCase(answers.group)

    this._copyStaticFiles()
    this._copyTplJava(answers)
    this._copyTplYml(answers)
    this._copyMybatis(answers)
    this._copyOther(answers)
  }

  // 基于用户输入的 name 变种: ocr bill
  _nameCase(name) {
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
  _groupCase(group) {
    return {
      splitByDot: group,
      // 字母小写，单词间 / 分割
      splitBySlash: group.split('\.').join('/'),
    }
  }

  // 输出所有 Mybatis 生成器相关文件
  _copyMybatis(data) {
    const basePath = `src/main/resources/mybatis`
    this.fs.copyTpl(this.templatePath(`${basePath}/_db-mysql.properties`), this.destinationPath(`${basePath}/db-mysql.properties`), data)
    this.fs.copyTpl(this.templatePath(`${basePath}/_generatorConfig.xml`), this.destinationPath(`${basePath}/generatorConfig.xml`), data)
  }

  // 输出所有 java 格式的模板文件
  _copyTplJava(data) {
    const baseTplPath = 'src/main/java/package'
    const baseDestPath = `src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}`
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/_Application.java`)
      , this.destinationPath(`${baseDestPath}/${data.nameCases.hump}Application.java`), data)
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/config/_Constants.java`)
      , this.destinationPath(`${baseDestPath}/config/Constants.java`), data)
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/config/_LiquibaseConfiguration.java`)
      , this.destinationPath(`${baseDestPath}/config/LiquibaseConfiguration.java`), data)
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/config/_MybatisConfiguration.java`)
      , this.destinationPath(`${baseDestPath}/config/MybatisConfiguration.java`), data)
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/config/_SwaggerConfiguration.java`)
      , this.destinationPath(`${baseDestPath}/config/SwaggerConfiguration.java`), data)
      this.fs.copyTpl(this.templatePath(`${baseTplPath}/web/rest/vo/_ResponseVO.java`)
      , this.destinationPath(`${baseDestPath}/web/rest/vo/ResponseVO.java`), data)
    this._copyPackageInfo(data)
  }

  // 输出所有 package-info.java
  _copyPackageInfo(data) {
    const baseTplPath = 'src/main/java/package'
    const baseDestPath = `src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}`
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/exception/_package-info.java`), this.destinationPath(`${baseDestPath}/exception/package-info.java`), data)
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/model/_package-info.java`), this.destinationPath(`${baseDestPath}/model/package-info.java`), data)
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/service/_package-info.java`), this.destinationPath(`${baseDestPath}/service/package-info.java`), data)
    this.fs.copyTpl(this.templatePath(`${baseTplPath}/web/rest/_package-info.java`), this.destinationPath(`${baseDestPath}/web/rest/package-info.java`), data)
  }

  // 输出所有 yml 格式的模板文件
  _copyTplYml(data) {
    this.fs.copyTpl(this.templatePath('src/main/resources/_application.yml')
      , this.destinationPath(`src/main/resources/application.yml`), data)
    this.fs.copyTpl(this.templatePath('src/main/resources/_application-dev.yml')
      , this.destinationPath(`src/main/resources/application-dev.yml`), data)
    this.fs.copyTpl(this.templatePath('src/main/resources/_application-test.yml')
      , this.destinationPath(`src/main/resources/application-test.yml`), data)
    this.fs.copyTpl(this.templatePath('src/main/resources/_application-prod.yml')
      , this.destinationPath(`src/main/resources/application-prod.yml`), data)
  }

  // 输出零碎文件
  _copyOther(data) {
    this.fs.copyTpl(this.templatePath('_build.gradle'), this.destinationPath(`build.gradle`), data)
    this.fs.copyTpl(this.templatePath(`_README.md`), this.destinationPath(`README.md`), data)
    this.fs.copyTpl(this.templatePath(`src/main/resources/_logback-spring.xml`), this.destinationPath(`src/main/resources/logback-spring.xml`), data)
  }

  _copyStaticFiles() {
    let files = [
      'gradle/wrapper/gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.properties',
      'gradle/mybatis_generate.gradle',
      '.editorconfig',
      '.gitignore',
      'gradlew',
      'gradlew.bat',
      'CHANGELOG.md',
      'src/main/resources/liquibase/master.xml'
    ]

    for (let file of files) {
      this.fs.copy(this.templatePath(file), this.destinationPath(file))
    }
  }
}