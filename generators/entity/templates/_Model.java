package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model;

<%_ for (var e of enums) { _%>
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.enums.<%= e.enumClass %>;
<%_ } _%>
import io.swagger.annotations.ApiModelProperty;
<%_ if (imports.isNullable) { _%>
import io.swagger.annotations.ApiParam;
<%_ } _%>
import lombok.Data;

import javax.persistence.*;
<%_ if (imports.isNullable) { _%>
import javax.validation.constraints.NotNull;
<%_ } _%>
<%_ if (imports.BigDecimal) { _%>
import java.math.BigDecimal;
<%_ } _%>
<%_ if (imports.Date) { _%>
import java.util.Date;
<%_ } _%>

<%_
// CreateTime, UpdateTime 取消 @NotNull 注解
function isIgnoreNotNull(columnName) {
  return columnName === 'create_time' || columnName === 'update_time'
}
_%>

/**
 * Entity <%= entityClass %>. <%= tableComment %>
 *
 * @author duiker(generated)
 */
@Data
@Table(name = "<%= tableName %>")
public class <%= entityClass %> {

    <%_ for (var i = 0; i < columns.length; i++) { _%>
        <%_ const column = columns[i] _%>
        <%_ if ('id' === column.COLUMN_NAME) { _%>
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
        <%_ } else { _%>
            <%_ if ('NO' === column.IS_NULLABLE && !isIgnoreNotNull(column.COLUMN_NAME)) { _%>
    @NotNull
    @ApiParam(required = true)
            <%_ } _%>
    @ApiModelProperty(value = "<%- column.COLUMN_COMMENT %>")
    @Column(name = "<%= column.COLUMN_NAME %>")
    private <%= column.fieldType %> <%= column.fieldName%>;
        <%_ } _%>

    <%_ } _%>
}
