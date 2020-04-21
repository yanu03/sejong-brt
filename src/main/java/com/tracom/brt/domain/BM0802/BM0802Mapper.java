package com.tracom.brt.domain.BM0802;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0802Mapper extends MyBatisMapper{

	List<RaceHistoryVO> BM0802G0S0(String filter);
	List<RaceHistoryVO> BM0802G1S0(String filter);
	
}
