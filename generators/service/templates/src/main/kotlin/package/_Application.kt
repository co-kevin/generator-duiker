package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient
import org.springframework.cloud.openfeign.EnableFeignClients

@EnableFeignClients
@EnableEurekaClient
@SpringBootApplication
class <%= nameCases.hump %>Application

fun main(args: Array<String>) {
    runApplication<<%= nameCases.hump %>Application>(*args)
}
