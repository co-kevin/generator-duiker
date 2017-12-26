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
    this._createEnums(data.enums, data.groupCases, data.nameCases)
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
   * Create enum files. column type is enum.
   *
   * @param {*Array} data
   * @param {*Object} groupCases
   * @param {*Object} nameCases
   */
  _createEnums(data, groupCases, nameCases) {
    const baseDestPath = `src/main/java/${groupCases.splitBySlash}/${nameCases.splitBySlash}`
    for (let d of data) {
      this.generator.fs.copyTpl(this.generator.templatePath(`_Enum.java`), this.generator.destinationPath(`${baseDestPath}/enums/${d.enumClass}.java`), {
        ...d,
        groupCases,
        nameCases
      })
    }
  }

  /**
   * Handle database column type to java entity type mapper.
   *
   * @param {*Array} columns
   */
  _mapper(columns) {
    const imports = {}
    const enums = []
    for (let column of columns) {
      if (!imports.isNullable && 'NO' === column.IS_NULLABLE) {
        imports.isNullable = true
      }

      switch (column.DATA_TYPE) {
        case 'text':
        case 'mediumtext':
        case 'longtext':
          // 将整数类型的 DATA_TYPE 换成 varchar，在写 Mapper.xml 的时候会用到
          column.DATA_TYPE = 'varchar'
        case 'varchar':
        case 'char':
          column.fieldType = 'String'
          break
        case 'timestamp':
        case 'date':
          column.fieldType = 'Date'
          imports.Date = true
          break
        case 'int':
        case 'smallint':
        case 'tinyint':
          // 将整数类型的 DATA_TYPE 换成 Integer，在写 Mapper.xml 的时候会用到
          column.DATA_TYPE = 'Integer'
          column.fieldType = 'Integer'
          break
        case 'double':
          column.fieldType = 'Double'
          break
        case 'decimal':
          column.fieldType = 'BigDecimal'
          imports.BigDecimal = true
          break
        case 'bit':
          column.fieldType = 'Boolean'
          break
        case 'enum':
          column.fieldType = _string.upperFirst(_string.camelCase(column.COLUMN_NAME))
          // 枚举类型 jdbcType 写成 VARCHAR
          column.DATA_TYPE = 'VARCHAR'
          enums.push({
            enumClass: column.fieldType,
            enums: this._cleanEnums(column.COLUMN_TYPE)
          })
          break
        default:
          console.warn(`We don't catch this data type: ${column.DATA_TYPE}`)
      }
      column.fieldName = _string.camelCase(column.COLUMN_NAME)
      column.COLUMN_COMMENT = _utils.trimAll(column.COLUMN_COMMENT)
    }
    return {
      columns,
      imports,
      enums
    }
  }

  /**
   * Clean column type. original: enum('iOS','Android','WEB')
   * output [ 'iOS', 'Android', 'WEB' ]
   */
  _cleanEnums(columnType) {
    if (!columnType) {
      return
    }
    // clean enum(
    var str = columnType.replace('enum(', '')
    // clean )
    str = str.replace(')', '')
    // clean all '
    str = str.replace(new RegExp('\'', 'gm'), '')
    return str.split(',')
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
      ...this._mapper(this.columns)
    }
  }
}
