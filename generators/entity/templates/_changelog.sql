--liquibase formatted sql
--changeset duiker(generated):<%= filename %>

SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for <%= tableName %>
-- ----------------------------
DROP TABLE IF EXISTS `<%= tableName %>`;
<%- ddl %>;

SET FOREIGN_KEY_CHECKS = 1;
