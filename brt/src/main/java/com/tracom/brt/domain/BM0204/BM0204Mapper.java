package com.tracom.brt.domain.BM0204;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0204Mapper extends MyBatisMapper{

	List<ObeConditionVO> BM0204G0S0(String filter);
	
}
