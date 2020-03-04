package com.tracom.brt.domain.BM0801;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0801Mapper extends MyBatisMapper{

	List<StatisticsVO> BM0801G0S0(Map<String, String> hm);
	List<StatisticsVO> BM0801G0S1(Map<String, String> hm);
	int insertAdLog(Map<String, Object> map);
}
