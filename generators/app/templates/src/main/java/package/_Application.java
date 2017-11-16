package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class <%= nameCases.hump %>Application {

    public static void main(String[] args) {
        SpringApplication.run(<%= nameCases.hump %>Application.class, args);
    }
}
