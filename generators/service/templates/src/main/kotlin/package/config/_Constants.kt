package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.config;

/**
 * @author hookszhang on 30/10/2017.
 */
object Constants {
    const val SPRING_PROFILE_DEVELOPMENT = "dev"
    const val SPRING_PROFILE_TEST = "test"
    const val SPRING_PROFILE_PRODUCTION = "prod"
    // Spring profile used to disable swagger
    const val SPRING_PROFILE_SWAGGER = "swagger"
    // Spring profile used to disable running liquibase
    const val SPRING_PROFILE_NO_LIQUIBASE = "no-liquibase"
}
