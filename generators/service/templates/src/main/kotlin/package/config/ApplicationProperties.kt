package io.github.microservice.components.message.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

/**
 * 应用个性化配置
 *
 * @author hookszhang on 2018/4/8.
 */
@Component
@ConfigurationProperties(prefix = "application")
class ApplicationProperties {

}
