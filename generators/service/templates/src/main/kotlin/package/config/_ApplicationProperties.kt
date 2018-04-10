package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config

import org.springframework.boot.context.properties.ConfigurationProperties

/**
 * 应用个性化配置
 *
 * @author hookszhang on 2018/4/8.
 */
@ConfigurationProperties(prefix = "application")
class ApplicationProperties {

}
