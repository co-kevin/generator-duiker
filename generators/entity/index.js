const Generator = require('yeoman-generator')
const _string = require('lodash/string')
const mysql = require('mysql')
var connection

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  prompting() {
    this._run({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'zdan91-smart-bill',
      tableName: 'sample_model'
    })
  }

  _run(answers) {
    this._createConnection(answers)
    this._copy(answers)
  }

  async _copy(answers) {
    try {
      const columns = await this._queryColumns(answers.database, answers.tableName)
      const tableComment = await this._queryTableComment(answers.database, answers.tableName)
      this._closeConnection()
      this._copyModel(columns, answers.tableName, tableComment)
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

  _copyModel(columns, tableName, tableComment) {
    // 处理数据库字段类型和字段名到实体类的映射
    for (let column of columns) {
      if ('varchar' === column.DATA_TYPE || 'char' === column.DATA_TYPE) {
        column.fieldType = 'String'
      } else if ('timestamp' === column.DATA_TYPE) {
        column.fieldType = 'Date'
      } else if ('int' === column.DATA_TYPE) {
        column.fieldType = 'Integer'
      } else if ('double' === column.DATA_TYPE) {
        column.fieldType = 'Double'
      } else if ('bit' === column.DATA_TYPE) {
        column.fieldType = 'Boolean'
      }
      column.fieldName = _string.camelCase(column.COLUMN_NAME)
    }
    // 构造模板数据
    const data = {
      group: 'com.zdan91',
      name: 'ocr bill',
      port: '8080',
      nameCases:
        {
          hump: 'OcrBill',
          kebab: 'ocr-bill',
          splitByDot: 'ocr.bill',
          splitBySlash: 'ocr/bill'
        },
      groupCases: { splitByDot: 'com.zdan91', splitBySlash: 'com/zdan91' },
      tableName,
      tableComment,
      entityClass: _string.upperFirst(_string.camelCase(tableName)),
      columns
    }
    const baseDestPath = `src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}`
    this.fs.copyTpl(this.templatePath(`_Model.java`), this.destinationPath(`${baseDestPath}/model/${data.entityClass}.java`), data)
  }

  _queryDDL(tableName) {
    connection.query(`
      show create table ${tableName}
    `, (error, results, fields) => {
        if (error) throw error
        console.log(results)
      })
  }

  _closeConnection() {
    connection.end()
  }
}