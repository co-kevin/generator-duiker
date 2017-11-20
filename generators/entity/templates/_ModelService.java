package com.zdan91.smart.bill.service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.zdan91.smart.bill.mapper.SampleModelMapper;
import com.zdan91.smart.bill.model.SampleModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SampleModelService extends ServiceImpl<SampleModelMapper, SampleModel> {
}
