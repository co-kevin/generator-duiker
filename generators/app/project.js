const _utils = require('../utils')

/**
 * Create a empty micro service project.
 *
 * Technology Stack:
 * Gradle
 * Spring Cloud Eureka
 * Mybatis
 * Liquibase
 * MySQL
 *
 * @author hookszhang
 */
module.exports = class {

  /**
   * Constructor a project by params.
   *
   * @param {*yeoman-generator} generator
   * @param {*object} answers
   */
  constructor(generator, answers) {
    this.generator = generator
    this.answers = answers
  }

  /**
   * Create a empty micro service project.
   */
  create() {
    const data = this._data()
    this._createStaticFiles(data)
    this._createJavaCode(data)
    this._createConfigYML(data)
  }

  /**
   * Get template data.
   * Transform from nameCases, groupCases, port
   */
  _data() {
    this.answers.nameCases = _utils.nameCase(this.answers.name)
    this.answers.groupCases = _utils.groupCase(this.answers.group)
    return this.answers
  }

  /**
   * Create java code files.
   *
   * @param {*object} data
   */
  _createJavaCode(data) {
    const baseTplPath = 'src/main/java/package'
    const baseDestPath = `src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}`
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/_Application.java`)
      , this.generator.destinationPath(`${baseDestPath}/${data.nameCases.hump}Application.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/config/_Constants.java`)
      , this.generator.destinationPath(`${baseDestPath}/config/Constants.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/config/_MapperScanConfiguration.java`)
    , this.generator.destinationPath(`${baseDestPath}/config/MapperScanConfiguration.java`), data)
  }

  /**
   * Static files create.
   * File List:
   * package-info.java, .gitignore, .editorconfig, README.md
   * gradlew, gradlew.bat, etc...
   *
   * @param {*object} data
   */
  _createStaticFiles(data) {
    const files = [
      'gradle/wrapper/gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.properties',
      '.editorconfig',
      '.gitignore',
      'gradlew',
      'gradlew.bat',
      'CHANGELOG.md',
      'src/main/resources/liquibase/master.xml',
      'src/main/resources/bootstrap-dev.yml'
    ]

    for (const file of files) {
      this.generator.fs.copy(this.generator.templatePath(file), this.generator.destinationPath(file))
    }

    const baseTplPath = 'src/main/java/package'
    const baseDestPath = `src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}`
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/exception/_package-info.java`), this.generator.destinationPath(`${baseDestPath}/exception/package-info.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/model/_package-info.java`), this.generator.destinationPath(`${baseDestPath}/model/package-info.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/enums/_package-info.java`), this.generator.destinationPath(`${baseDestPath}/enums/package-info.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/mapper/_package-info.java`), this.generator.destinationPath(`${baseDestPath}/mapper/package-info.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/service/_package-info.java`), this.generator.destinationPath(`${baseDestPath}/service/package-info.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/web/rest/_package-info.java`), this.generator.destinationPath(`${baseDestPath}/web/rest/package-info.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`${baseTplPath}/web/rest/vo/_package-info.java`), this.generator.destinationPath(`${baseDestPath}/web/rest/vo/package-info.java`), data)

    this.generator.fs.copyTpl(this.generator.templatePath('_build.gradle'), this.generator.destinationPath(`build.gradle`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`_README.md`), this.generator.destinationPath(`README.md`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`src/main/resources/_logback-spring.xml`), this.generator.destinationPath(`src/main/resources/logback-spring.xml`), data)
  }

  /**
   * Create spring application config yml files.
   *
   * @param {*object} data
   */
  _createConfigYML(data) {
    this.generator.fs.copyTpl(this.generator.templatePath('src/main/resources/_bootstrap.yml')
    , this.generator.destinationPath(`src/main/resources/bootstrap.yml`), data)
    this.generator.fs.copyTpl(this.generator.templatePath('src/main/resources/_application.yml')
      , this.generator.destinationPath(`src/main/resources/application.yml`), data)
    this.generator.fs.copyTpl(this.generator.templatePath('src/main/resources/_application-dev.yml')
      , this.generator.destinationPath(`src/main/resources/application-dev.yml`), data)
    this.generator.fs.copyTpl(this.generator.templatePath('src/main/resources/_application-test.yml')
      , this.generator.destinationPath(`src/main/resources/application-test.yml`), data)
    this.generator.fs.copyTpl(this.generator.templatePath('src/main/resources/_application-prod.yml')
      , this.generator.destinationPath(`src/main/resources/application-prod.yml`), data)
  }
}
