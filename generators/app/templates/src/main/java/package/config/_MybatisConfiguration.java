package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config;

import com.baomidou.mybatisplus.plugins.PaginationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Mybatis, Mybatis Plus Configuration
 */
@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
public class MybatisConfiguration {
    /**
     * 分页插件
     */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}
