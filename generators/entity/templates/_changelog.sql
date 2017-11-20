--liquibase formatted sql
--changeset hookszhang(generated):20171117180219_add_table_sample_model

SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for sample_model
-- ----------------------------
DROP TABLE IF EXISTS `sample_model`;
CREATE TABLE `sample_model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `double_field` double(11,2) NOT NULL COMMENT '浮点数类型字段',
  `integer_field` int(11) DEFAULT NULL COMMENT '整数类型字段',
  `string_field` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '字符串类型字段',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '日期类型字段',
  `bool` bit(1) DEFAULT NULL COMMENT '布尔类型字段',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

SET FOREIGN_KEY_CHECKS = 1;
