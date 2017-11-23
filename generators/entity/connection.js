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

  /**
   * Show all tables in current database.
   * Ignore liquibase changelog table DATABASECHANGELOG, DATABASECHANGELOGLOCK
   */
  showTables() {
    return new Promise((resolve, reject) => {
      this.connection.query(`show tables`, (error, results, fields) => {
        if (error) return reject(error)
        const fieldName = fields[0].name
        const tables = new Array()
        for (const row of results) {
          const table = row[fieldName]
          if (!table) {
            console.warn(`Wrong fieldName: ${fieldName}`)
            break
          }
          // Ignore liquibase changelog table DATABASECHANGELOG, DATABASECHANGELOGLOCK
          if (table === 'DATABASECHANGELOG' || table === 'DATABASECHANGELOGLOCK') {
            continue
          }
          tables.push(table)
        }
        resolve(tables)
      })
    })
  }

  /**
   * Query table columns information.
   * From table information_schema.columns.
   *
   * @param {*string} tableName
   */
  queryColumns(tableName) {
    return new Promise((resolve, reject) => {
      const sql = `select * from information_schema.columns
      where table_schema = '${this.database}' and table_name = '${tableName}'`
      this.connection.query(sql, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results)
      })
    })
  }

  /**
   * Query table comment information.
   * From table information_schema.tables.
   *
   * @param {*string} tableName
   */
  queryTableComment(tableName) {
    return new Promise((resolve, reject) => {
      const sql = `select table_name, table_comment from information_schema.tables
      where table_schema = '${this.database}' and table_name = '${tableName}'`
      this.connection.query(sql, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results[0].table_comment)
      })
    })
  }

  /**
   * Query table create sql.
   * SQL: show create table ${tableName}
   *
   * @param {*string} tableName
   */
  queryDDL(tableName) {
    return new Promise((resolve, reject) => {
      this.connection.query(`show create table ${tableName}`, (error, results, fields) => {
        if (error) return reject(error)
        resolve(results[0]['Create Table'])
      })
    })
  }
}
