package com.tracom.brt.domain.BM0203;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0203Mapper extends MyBatisMapper{
	
	List<DvcConditionVO> BM0203G0S0(String filter);
	List<DvcConditionVO> BM0203G1S0(String filter);
}
