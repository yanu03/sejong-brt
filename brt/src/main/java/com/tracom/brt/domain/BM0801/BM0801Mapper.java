package com.tracom.brt.domain.BM0801;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0801Mapper extends MyBatisMapper{

	List<StatisticsVO> BM0801G0S0(String filter);
	List<StatisticsVO> BM0801G0S1(String filter);
}
