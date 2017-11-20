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
    <%_ for (var i = 0; i < results.length; i++) { _%>
        <%_ const result = results[i] _%>

        <%_ if ('id' === result.COLUMN_NAME) { _%>
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
        <%_ } else { _%>
            <%_ if ('YES' === result.IS_NULLABLE) { _%>
    @NotNull
    @ApiParam(required = true)
            <%_ } _%>
    @ApiModelProperty(value = "<%= result.COLUMN_COMMENT %>")
    @Column(name = "<%= result.COLUMN_NAME %>")
    private <%= result.fieldType %> <%= result.fieldName%>;
        <%_ } _%>
    <%_ } _%>
}
