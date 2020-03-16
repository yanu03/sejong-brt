package com.tracom.brt.domain.AD0106;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.AD0103.AdInstDlVO;

public interface AD0106Mapper extends MyBatisMapper{
	List<AdInstDlVO> AD0106G0S0(Map<String, Object> params);
}
