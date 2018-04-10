package io.github.microservice.components.message.config

import com.baomidou.mybatisplus.plugins.PerformanceInterceptor
import org.mybatis.spring.annotation.MapperScan
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile

@Configuration
@MapperScan("io.github.microservice.components.message.mapper*")
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