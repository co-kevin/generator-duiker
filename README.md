# duiker (小羚羊)

Yeoman 工程脚手架，可以生成基础微服务项目，CRUD 代码

## Yeoman http://yeoman.io

THE WEB'S SCAFFOLDING TOOL FOR MODERN WEBAPPS

Get started and then find a generator for your webapp. Generators are available for Angular, Backbone, React, Polymer and over 5600+ other projects.

One-line install using npm: `npm install -g yo`

## Usage

```
$ git clone http://git.91zdan.com/91zdan-back-end/generator-duiker.git && cd generator-duiker
$ npm link
```

### Mirco Service

生成基础微服务项目

```
$ mkdir mirco-service
$ yo duiker
? Your project group
? Your project name
? Your project port
```

### Entity

只需要在数据库创建好表结构，即可生成一整套的增删改查代码

```
$ cd $PROJECT_HOME
$ yo duiker:entity
? Your project group
? Your project name
? Your mysql host
? Your mysql user
? Your mysql password
? Your database
? Your table name
create _Model.java
create _ModelMapper.java
create _ModelService.java
create _ModelResource.java
create _ModelMapper.xml
create _changelog.sql
```