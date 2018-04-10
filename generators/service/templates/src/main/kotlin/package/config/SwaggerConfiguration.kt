package io.github.microservice.components.message.config

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.util.StopWatch
import springfox.documentation.builders.ApiInfoBuilder
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2

/**
 * @author hookszhang on 01/11/2017.
 */
@Configuration
@EnableSwagger2
@Profile(Constants.SPRING_PROFILE_SWAGGER)
class SwaggerConfiguration {

    private val log = LoggerFactory.getLogger(SwaggerConfiguration::class.java)

    @Value("\${info.project.title}")
    private val title: String? = null
    @Value("\${info.project.description}")
    private val description: String? = null
    @Value("\${info.project.version}")
    private val version: String? = null

    @Bean
    fun createRestApi(): Docket {
        log.debug("Starting Swagger")
        val watch = StopWatch()
        watch.start()

        val apiInfo = ApiInfoBuilder()
                .title(title)
                .description(description)
                .termsOfServiceUrl("")
                .version(version)
                .build()

        val docket = Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo)
                .select()
                .apis(RequestHandlerSelectors.basePackage("io.github.microservice.components.message.web.rest"))
                .paths(PathSelectors.any())
                .build()
        watch.stop()
        log.debug("Started Swagger in {} ms", watch.totalTimeMillis)
        return docket
    }
}