package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

@EnableEurekaClient
@SpringBootApplication
@EnableFeignClients
@MapperScan("<%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.mapper*")
public class <%= nameCases.hump %>Application {

    public static void main(String[] args) {
        SpringApplication.run(<%= nameCases.hump %>Application.class, args);
    }
}
