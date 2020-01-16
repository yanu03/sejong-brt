package com.tracom.brt.domain.BM0202;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0202Mapper extends MyBatisMapper{

	List<DvcHistoryVO> BM0202G2S0(String filter);
	List<DvcHistoryVO> BM0202G2S1(Map<String, String> map);
	int BM0202G2D0(DvcHistoryVO vo);
	int BM0202G2U0(DvcHistoryVO vo);
	
}
