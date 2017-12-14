package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("<%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.mapper*")
public class MybatisConfiguration {
}
