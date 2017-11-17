package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.util.StopWatch;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Swagger Configuration
 */
@Configuration
@EnableSwagger2
@Profile(Constants.SPRING_PROFILE_SWAGGER)
public class SwaggerConfiguration {

    private final Logger log = LoggerFactory.getLogger(SwaggerConfiguration.class);

    @Value("${info.project.title}")
    private String title;
    @Value("${info.project.description}")
    private String description;
    @Value("${info.project.version}")
    private String version;

    @Bean
    public Docket createRestApi() {
        log.info("Starting Swagger");
        StopWatch watch = new StopWatch();
        watch.start();

        ApiInfo apiInfo = new ApiInfoBuilder()
            .title(title)
            .description(description)
            .termsOfServiceUrl("")
            .version(version)
            .build();

        Docket docket = new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo)
            .select()
            .apis(RequestHandlerSelectors.basePackage("<%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.web.rest"))
            .paths(PathSelectors.any())
            .build();
        watch.stop();
        log.info("Started Swagger in {} ms", watch.getTotalTimeMillis());
        return docket;
    }
}
