package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

/**
 * 应用个性化配置
 *
 * @author hookszhang on 2018/4/8.
 */
@ConfigurationProperties(prefix = "application")
@Component
class ApplicationProperties {

}
