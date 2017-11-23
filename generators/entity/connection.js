const mysql = require('mysql')

/**
 * MySQL Connection. Create connection and close.
 * Query table, column informations, etc.
 *
 * @link https://github.com/mysqljs/mysql
 * @author hookszhang
 */
module.exports = class {

  /**
   * Constructor a mysql connection.
   *
   * @param {*string} mysqlURL mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700
   */
  constructor(mysqlURL) {
    this.mysqlURL = mysqlURL
  }

  /**
   * Create mysql connection.
   * if error, process exit 1 and print error log to console
   *
   * @param {*string} mysqlURL mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700
   */
  async createConnection() {
    this.connection = mysql.createConnection(this.mysqlURL)
    await this.connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack)
        process.exit(1)
      }
    })
    // set current database
    this.database = this.connection.config.database
  }

  /**
   * Safe close mysql connection.
   * Must be call when process exit
   */
  close() {
    this.connection.end()
  }

  queryTables() {

  }

  queryColumns(database, tableName) {
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

  queryTableComment(database, tableName) {
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

  queryDDL(tableName) {
    return new Promise(function (resolve, reject) {
      connection.query(`
      show create table ${tableName}
    `, (error, results, fields) => {
          if (error) return reject(error)
          resolve(results[0]['Create Table'])
        })
    })
  }
}
