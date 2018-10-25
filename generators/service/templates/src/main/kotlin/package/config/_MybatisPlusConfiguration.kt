package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config

import com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor
import org.mybatis.spring.annotation.MapperScan
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile

@Configuration
@MapperScan("<%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.mapper*")
class MybatisPlusConfiguration {
    /**
     * SQL执行效率插件
     */
    @Bean
    @Profile("dev", "test")// 设置 dev test 环境开启
    fun performanceInterceptor(): PerformanceInterceptor {
        return PerformanceInterceptor()
    }
}
