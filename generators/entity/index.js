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
    this._query(answers.database, answers.tableName)
    this._queryDDL(answers.tableName)
    console.log('// TODO generate entity')
  }

  _createConnection(answers) {
    connection = mysql.createConnection({
      host: answers.host,
      user: answers.user,
      password: answers.password,
      database: answers.database
    })

    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
    })
  }

  _query(database, tableName) {
    connection.query(`
      select * from information_schema.columns
      where table_schema = '${database}'
      and table_name = '${tableName}'
    `, (error, results, fields) => {
        if (error) throw error
        this._copyModel(results, { database, tableName })
      })
  }

  async _copyModel(results, answers) {
    // 处理数据库字段类型和字段名到实体类的映射
    for (let result of results) {
      if ('varchar' === result.DATA_TYPE || 'char' === result.DATA_TYPE) {
        result.fieldType = 'String'
      } else if ('timestamp' === result.DATA_TYPE) {
        result.fieldType = 'Date'
      } else if ('int' === result.DATA_TYPE) {
        result.fieldType = 'Integer'
      } else if ('double' === result.DATA_TYPE) {
        result.fieldType = 'Double'
      } else if ('bit' === result.DATA_TYPE) {
        result.fieldType = 'Boolean'
      }
      result.fieldName = _string.camelCase(result.COLUMN_NAME)
    }
    const tableComment = await this._queryTableComment(answers.database, answers.tableName)
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
      tableName: answers.tableName,
      tableComment,
      entityClass: _string.upperFirst(_string.camelCase(answers.tableName)),
      results
    }
    const baseDestPath = `src/main/java/${data.groupCases.splitBySlash}/${data.nameCases.splitBySlash}`
    this.fs.copyTpl(this.templatePath(`_Model.java`), this.destinationPath(`${baseDestPath}/model/${answers.tableName}.java`), data)
  }

  _queryTableComment(database, tableName) {
    return new Promise(function (resolve, reject) {
      connection.query(`
      select table_name, table_comment
      from information_schema.tables
      where table_schema = '${database}'
      and table_name = '${tableName}'
    `, (error, results, fields) => {
          if (error) reject(error)
          resolve(results.table_comment)
        })
    })
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