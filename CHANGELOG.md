# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## unreleased
## [1.0.2] - 2017-11-22
### Added

- 添加 Mybatis Plus 配置到 application.yml
- 添加 mysql, liquibase 版本号到 build.gradle 

## [1.0.1] - 2017-11-21
### Fixed

- 修复数据库字段注释含有空白字符会导致生成出的 Java 代码编译不通过的问题
- 修复 mybatis jdbc type int 映射，映射为 INTEGER 而不是 INT

### Added

- 新捕获几种数据库类型 smallint、tinyint、date
- 如果数据库中的字段类型是意料之外的，会打出警告日志

## [1.0.0] - 2017-11-20
### Added

- Mirco Service 生成基础微服务项目
- Entity 只需要在数据库创建好表结构，即可生成一整套的增删改查代码