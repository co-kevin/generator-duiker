package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableId
<%_ for (var e of enums) { _%>
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.enums.<%= e.enumClass %>
<%_ } _%>
import io.swagger.annotations.ApiModelProperty
<%_ if (imports.isNullable) { _%>
import io.swagger.annotations.ApiParam
<%_ } _%>
import javax.persistence.*
<%_ if (imports.isNullable) { _%>
import javax.validation.constraints.NotNull
<%_ } _%>
<%_ if (imports.BigDecimal) { _%>
import java.math.BigDecimal
<%_ } _%>
<%_ if (imports.Date) { _%>
import java.util.Date
<%_ } _%>
<%_
// CreateTime, UpdateTime 取消 @NotNull 注解
function isIgnoreNotNull(columnName) {
  return columnName === 'create_time' || columnName === 'update_time'
}
// 逗号，i 是当前循环次数，limit 是最大循环次数，最后一次不加逗号
function comma(i, limit) {
  if (i < limit - 1) {
    return ','
  } else {
    return ''
  }
}
_%>

/**
 * Entity <%= entityClass %>. <%= tableComment %>
 *
 * @author duiker(generated)
 */
@Table(name = "<%= tableName %>")
data class <%= entityClass %> (

    <%_ for (var i = 0; i < columns.length; i++) { _%>
        <%_ const column = columns[i] _%>
        <%_ if ('id' === column.COLUMN_NAME) { _%>
        @field:TableId(type = IdType.UUID)
        @field:Column(name = "id")
        var id: String? = null,
        <%_ } else { _%>
            <%_ if ('NO' === column.IS_NULLABLE && !isIgnoreNotNull(column.COLUMN_NAME)) { _%>
        @field:NotNull
        @field:ApiParam(required = true)
            <%_ } _%>
        @field:ApiModelProperty(value = "<%- column.COLUMN_COMMENT %>")
        @field:Column(name = "<%= column.COLUMN_NAME %>")
        var <%= column.fieldName%>: <%= column.fieldType %>? = null<%= comma(i, columns.length) _%>

        <%_ } _%>

    <%_ } _%>
)
