const Generator = require('yeoman-generator')
const _string = require('lodash/string')
const mysql = require('mysql')
const moment = require('moment')
var connection

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  prompting() {
    // console.log(this.config.getAll())
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
      name: 'host',
      message: 'Your mysql host',
      default: this.mysqlhost, // Default to current folder name
      store: true
    }, {
      type: 'input',
      name: 'user',
      message: 'Your mysql user',
      default: this.mysqluser, // Default to current folder name
      store: true
    }, {
      type: 'input',
      name: 'password',
      message: 'Your mysql password',
      default: this.mysqlpassword, // Default to current folder name
      store: true
    }, {
      type: 'input',
      name: 'database',
      message: 'Your database',
      default: this.database, // Default to current folder name
      store: true
    }, {
      type: 'input',
      name: 'tableName',
      message: 'Your table name',
      default: this.tableName, // Default to current folder name
      store: true
    }]).then((answers) => {
      this._run(answers)
    })
    // this._run({
    //   host: 'localhost',
    //   user: 'root',
    //   password: '',
    //   database: 'zdan91-smart-bill',
    //   tableName: 'sample_model'
    // })
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

  async _createConnection(answers) {
    connection = mysql.createConnection({
      host: answers.host,
      user: answers.user,
      password: answers.password,
      database: answers.database
    })

    await connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    })
  }

  _queryColumns(database, tableName) {
    return new Promise(function (resolve, reject) {
      connection.query(`
      select * from information_schema.columns
      where table_schema = '${database}'
      and table_name = '${tableName}'
    `, (error, results, fields) => {
          if (error) return reject(error)
          resolve(results)
        })
    })
  }

  _queryTableComment(database, tableName) {
    return new Promise(function (resolve, reject) {
      connection.query(`
      select table_name, table_comment
      from information_schema.tables
      where table_schema = '${database}'
      and table_name = '${tableName}'
    `, (error, results, fields) => {
          if (error) return reject(error)
          resolve(results[0].table_comment)
        })
    })
  }

  _queryDDL(tableName) {
    return new Promise(function (resolve, reject) {
      connection.query(`
      show create table ${tableName}
    `, (error, results, fields) => {
          if (error) return reject(error)
          resolve(results[0]['Create Table'])
        })
    })
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

  _copyModel(columns, tableName, tableComment, nameCases, groupCases) {
    // 处理数据库字段类型和字段名到实体类的映射
    for (let column of columns) {
      if ('varchar' === column.DATA_TYPE || 'char' === column.DATA_TYPE) {
        column.fieldType = 'String'
      } else if ('timestamp' === column.DATA_TYPE) {
        column.fieldType = 'Date'
      } else if ('int' === column.DATA_TYPE) {
        column.fieldType = 'Integer'
      } else if ('double' === column.DATA_TYPE || 'decimal' === column.DATA_TYPE) {
        column.fieldType = 'Double'
      } else if ('bit' === column.DATA_TYPE) {
        column.fieldType = 'Boolean'
      }
      column.fieldName = _string.camelCase(column.COLUMN_NAME)
    }
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