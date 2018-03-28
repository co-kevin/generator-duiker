package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.service

import com.baomidou.mybatisplus.service.impl.ServiceImpl
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.mapper.<%= entityClass %>Mapper
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model.<%= entityClass %>
import org.springframework.stereotype.Service

@Service
class <%= entityClass %>Service : ServiceImpl<<%= entityClass %>Mapper, <%= entityClass %>>() {
}
