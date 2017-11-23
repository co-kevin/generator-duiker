const Generator = require('yeoman-generator')
const _string = require('lodash/string')
const moment = require('moment')
const Question = require('./question')
const Connection = require('./connection')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)
  }

  async prompting() {
    const question = new Question(this)
    const mysqlURL = await question.askConnection()
    this.connection = new Connection(mysqlURL)
    this.connection.createConnection()
    const tables = await this.connection.showTables()
    if (0 === tables.length) {
      console.warn('Table list is empty. Please create table before generate!')
      process.exit(1)
    }
    const answerTables = await question.askTables(tables)
    console.log(answerTables)
    // this.connection.close()
  }

  _run(answers) {
    answers.nameCases = this._nameCase(answers.name)
    answers.groupCases = this._groupCase(answers.group)
    this._createConnection(answers)
    this._copy(answers)
  }

  async _copy(answers) {
    try {
      const columns = await this._queryColumns(answers.database, answers.tableName)
      const tableComment = await this._queryTableComment(answers.database, answers.tableName)
      const ddl = await this._queryDDL(answers.tableName)
      this._closeConnection()
      this._copyModel(columns, answers.tableName, tableComment, answers.nameCases, answers.groupCases)
      this._copyLiquibaseChangelog(answers.tableName, ddl)
    } catch (e) {
      throw e
    }
  }

  _copyLiquibaseChangelog(tableName, ddl) {
    const time = moment().format('YYYYMMDDHHmmss')
    const filename = `${time}_add_table_${tableName}`
    const data = {
      filename,
      ddl,
      tableName
    }
    this.fs.copyTpl(this.templatePath(`_changelog.sql`), this.destinationPath(`src/main/resources/liquibase/changelog/${filename}.sql`), data)
  }

  // 处理数据库字段类型和字段名到实体类的映射
  _handleMapper(columns) {
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
      column.COLUMN_COMMENT = this._trimAll(column.COLUMN_COMMENT)
    }
  }

  // 删除字段注释中的所有空白字符, 防止生成 Java 代码时编译错误
  _trimAll(str) {
    if (str) {
      return str.replace(/\s/g, '')
    }
    return str
  }

  _copyModel(columns, tableName, tableComment, nameCases, groupCases) {
    this._handleMapper(columns)
    // 构造模板数据
    const data = {
      nameCases,
      groupCases,
      tableName,
      tableComment,
      entityClass: _string.upperFirst(_string.camelCase(tableName)),
      entityClassCamelCase: _string.camelCase(tableName),
      columns
    }
    const baseDestPath = `src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}`
    this.fs.copyTpl(this.templatePath(`_Model.java`), this.destinationPath(`${baseDestPath}/model/${data.entityClass}.java`), data)
    this.fs.copyTpl(this.templatePath(`_ModelMapper.java`), this.destinationPath(`${baseDestPath}/mapper/${data.entityClass}Mapper.java`), data)
    this.fs.copyTpl(this.templatePath(`_ModelService.java`), this.destinationPath(`${baseDestPath}/service/${data.entityClass}Service.java`), data)
    this.fs.copyTpl(this.templatePath(`_ModelResource.java`), this.destinationPath(`${baseDestPath}/web/rest/${data.entityClass}Resource.java`), data)
    this.fs.copyTpl(this.templatePath(`_ModelMapper.xml`), this.destinationPath(`src/main/resources/mapper/${data.entityClass}Mapper.xml`), data)
  }

  _closeConnection() {
    connection.end()
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
}
