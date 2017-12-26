# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.1.1] - 2017-12-26
### Fixed

- Bug Fix: #7 Data Type Text mapping error

## [2.1.0] - 2017-12-14
### Added

- yo duiker 添加 Zipkin，Sleuth，Config 支持

### Updated

- 升级 duiker 至 0.0.12-dev

### Fixed

- Mybatis Plus 配置修复

## [2.1.0-rc1] - 2017-12-7
### Added

- yo duiker:entity 增加枚举支持
- 捕获 data type mediumtext, text
- 配置私有仓库到 yo duiker 中

## [2.0.0] - 2017-12-7
### Added

- 添加核心代码库 duiker
- 添加 Kotlin 支持

### Changed

- yo duiker:entity 适应新的 Http 规范

## [2.0.0-rc1]
### Added

- 添加 Mybatis Plus 配置到 application.yml
- 添加 mysql, liquibase 版本号到 build.gradle
- 支持同时从多张表生成

### Changed

- 优化用户界面体验，减少输入
- 数据库中 decimal 类型映射到 BigDecimal 而不是 Double

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
