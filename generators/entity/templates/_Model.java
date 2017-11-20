package com.zdan91.smart.bill.model;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 表描述
 */
@Data
@Table(name = "sample_model")
public class SampleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "主键ID")
    @Column(name = "id")
    private Integer id;

    @NotNull
    @ApiParam(required = true)
    @ApiModelProperty(value = "浮点数类型字段")
    @Column(name = "double_field")
    private Double doubleField;

    @ApiModelProperty(value = "整数类型字段")
    @Column(name = "integer_field")
    private Integer integerField;

    @NotNull
    @ApiParam(required = true)
    @ApiModelProperty(value = "字符串类型字段")
    @Column(name = "string_field")
    private String stringField;

    @NotNull
    @ApiModelProperty(value = "日期类型字段")
    @Column(name = "date")
    private Date date;

    @ApiModelProperty(value = "布尔类型字段")
    @Column(name = "bool")
    private Boolean bool;
}
