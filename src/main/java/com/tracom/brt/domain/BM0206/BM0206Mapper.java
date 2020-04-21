package com.tracom.brt.domain.BM0206;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0206Mapper extends MyBatisMapper{

	List<UpdateHistoryVO> BM0206G2S0(String filter);
	List<UpdateHistoryVO> BM0206G2S1(Map<String, String> map);
}
