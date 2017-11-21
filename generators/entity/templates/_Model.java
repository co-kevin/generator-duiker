package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * <%= tableComment %>
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
            <%_ if ('NO' === column.IS_NULLABLE) { _%>
    @NotNull
    @ApiParam(required = true)
            <%_ } _%>
    @ApiModelProperty(value = "<%- column.COLUMN_COMMENT %>")
    @Column(name = "<%= column.COLUMN_NAME %>")
    private <%= column.fieldType %> <%= column.fieldName%>;
        <%_ } _%>
    <%_ } _%>
}
