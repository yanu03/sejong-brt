package com.tracom.brt.domain.AD0104;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.AD0103.AdInstInfoVO;

public interface AD0104Mapper extends MyBatisMapper{
	List<AdInstInfoVO> AD0104G0S0(Map<String, Object> params);
}
