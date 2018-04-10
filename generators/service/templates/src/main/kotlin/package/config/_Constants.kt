package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config;

/**
 * @author hookszhang on 30/10/2017.
 */
object Constants {
    val SPRING_PROFILE_DEVELOPMENT = "dev"
    val SPRING_PROFILE_TEST = "test"
    val SPRING_PROFILE_PRODUCTION = "prod"
    // Spring profile used to disable swagger
    val SPRING_PROFILE_SWAGGER = "swagger"
    // Spring profile used to disable running liquibase
    val SPRING_PROFILE_NO_LIQUIBASE = "no-liquibase"
}

