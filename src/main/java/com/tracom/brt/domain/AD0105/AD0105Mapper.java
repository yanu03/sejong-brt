package com.tracom.brt.domain.AD0105;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.AD0103.AdInstDlVO;

public interface AD0105Mapper extends MyBatisMapper{
	List<AdInstDlVO> AD0105G0S0(Map<String, Object> params);
}
