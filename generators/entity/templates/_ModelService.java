package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.mapper.<%= entityClass %>Mapper;
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model.<%= entityClass %>;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class <%= entityClass %>Service extends ServiceImpl<<%= entityClass %>Mapper, <%= entityClass %>> {
}
