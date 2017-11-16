package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Mybatis, Mybatis Plus Configuration
 */
@Configuration
@EnableTransactionManagement
@MapperScan("<%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.mapper*")
public class MybatisConfiguration {
}
