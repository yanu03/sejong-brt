package com.tracom.brt.domain.BM0801;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0801Mapper extends MyBatisMapper{

	List<StatisticsVO> BM0801G0S0(Map<String, Object> params);
	List<StatisticsVO> BM0801G1S0(Map<String, Object> params);
	int insertAdLog(StatisticsVO map);
}
