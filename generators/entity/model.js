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
      switch (column.DATA_TYPE) {
        case 'varchar':
        case 'char':
        case 'longtext':
          column.fieldType = 'String'
          break
        case 'timestamp':
        case 'date':
          column.fieldType = 'Date'
          break
        case 'int':
        case 'smallint':
        case 'tinyint':
          // 将整数类型的 DATA_TYPE 换成 Integer，在写 Mapper.xml 的时候会用到
          column.DATA_TYPE = 'Integer'
          column.fieldType = 'Integer'
          break
        case 'double':
        case 'decimal':
          column.fieldType = 'Double'
          break
        case 'bit':
          column.fieldType = 'Boolean'
          break
        default:
          console.warn(`We don't catch this data type: ${column.DATA_TYPE}`)
      }
      column.fieldName = _string.camelCase(column.COLUMN_NAME)
      column.COLUMN_COMMENT = _utils.trimAll(column.COLUMN_COMMENT)
    }
    return columns
  }

  /**
   * Get template data.
   * Transform from tableName, tableComment, columns, ddl, nameCase, groupCase
   */
  _data() {
    return {
      nameCases: this.nameCase,
      groupCases: this.groupCase,
      tableName: this.tableName,
      tableComment: this.tableComment,
      entityClass: _string.upperFirst(_string.camelCase(this.tableName)),
      entityClassCamelCase: _string.camelCase(this.tableName),
      columns: this._mapper(this.columns)
    }
  }
}
