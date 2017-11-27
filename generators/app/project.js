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
   * @param {*string} nameCases
   * @param {*string} groupCases
   */
  constructor(generator, nameCases, groupCases, port) {
    this.generator = generator
    this.nameCases = nameCases
    this.groupCases = groupCases
    this.port = port
  }

  /**
   * Create a empty micro service project.
   *
   */
  create() {

  }

  /**
   * Get template data.
   * Transform from nameCases, groupCases, port
   */
  _data() {

  }

  /**
   * Static files create.
   * File List:
   * package-info.java, .gitignore, .editorconfig, README.md
   * gradlew, gradlew.bat, etc...
   */
  _createStaticFiles() {

  }
}
