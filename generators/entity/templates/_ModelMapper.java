package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model.<%= entityClass %>;

public interface <%= entityClass %>Mapper extends BaseMapper<<%= entityClass %>> {
}
