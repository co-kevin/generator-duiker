const _string = require('lodash/string')
const _utils = require('../utils')
const moment = require('moment')

/**
 * Model class. create code files.
 *
 * @author hookszhang
 */
module.exports = class {

  /**
   * Constructor a model by params.
   *
   * @param {*yeoman-generator} generator
   * @param {*string} tableName
   * @param {*string} tableComment
   * @param {*Array} columns
   * @param {*string} ddl
   * @param {*object} nameCase
   * @param {*object} groupCase
   */
  constructor(generator, tableName, tableComment, columns, ddl, nameCase, groupCase) {
    this.generator = generator
    this.tableName = tableName
    this.columns = columns
    this.ddl = ddl
    this.nameCase = nameCase
    this.groupCase = groupCase
  }

  /**
   * Create code files.
   */
  create() {
    const data = this._data()
    const baseDestPath = `src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}`
    this.generator.fs.copyTpl(this.generator.templatePath(`_Model.java`), this.generator.destinationPath(`${baseDestPath}/model/${data.entityClass}.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`_ModelMapper.java`), this.generator.destinationPath(`${baseDestPath}/mapper/${data.entityClass}Mapper.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`_ModelService.java`), this.generator.destinationPath(`${baseDestPath}/service/${data.entityClass}Service.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`_ModelResource.java`), this.generator.destinationPath(`${baseDestPath}/web/rest/${data.entityClass}Resource.java`), data)
    this.generator.fs.copyTpl(this.generator.templatePath(`_ModelMapper.xml`), this.generator.destinationPath(`src/main/resources/mapper/${data.entityClass}Mapper.xml`), data)
    this._createLiquibaseChangelog()
  }

  /**
   * Create database changelog sql
   */
  _createLiquibaseChangelog() {
    const time = moment().format('YYYYMMDDHHmmss')
    const filename = `${time}_add_table_${this.tableName}`
    const data = {
      filename,
      ddl: this.ddl,
      tableName: this.tableName
    }
    this.generator.fs.copyTpl(this.generator.templatePath(`_changelog.sql`), this.generator.destinationPath(`src/main/resources/liquibase/changelog/${filename}.sql`), data)
  }

  /**
   * Handle database column type to java entity type mapper.
   *
   * @param {*Array} columns
   */
  _mapper(columns) {
    for (let column of columns) {
      if ('varchar' === column.DATA_TYPE || 'char' === column.DATA_TYPE) {
        column.fieldType = 'String'
      } else if ('timestamp' === column.DATA_TYPE || 'date' === column.DATA_TYPE) {
        column.fieldType = 'Date'
      } else if ('int' === column.DATA_TYPE ||
        'smallint' === column.DATA_TYPE ||
        'tinyint' === column.DATA_TYPE) {
        column.DATA_TYPE = 'Integer' // 将整数类型的 DATA_TYPE 换成 Integer，在写 Mapper.xml 的时候会用到
        column.fieldType = 'Integer'
      } else if ('double' === column.DATA_TYPE || 'decimal' === column.DATA_TYPE) {
        column.fieldType = 'Double'
      } else if ('bit' === column.DATA_TYPE) {
        column.fieldType = 'Boolean'
      } else {
        console.warn(`We don't catch this data type: ${column.DATA_TYPE}`)
      }
      column.fieldName = _string.camelCase(column.COLUMN_NAME)
      column.COLUMN_COMMENT = _utils._trimAll(column.COLUMN_COMMENT)
    }
    return columns
  }

  /**
   * Get template data.
   * Transform from tableName, tableComment, columns, ddl, nameCase, groupCase
   */
  _data() {
    return {
      nameCases,
      groupCases,
      tableName,
      tableComment,
      entityClass: _string.upperFirst(_string.camelCase(this.tableName)),
      entityClassCamelCase: _string.camelCase(this.tableName),
      columns: this._mapper(this.columns)
    }
  }
}
