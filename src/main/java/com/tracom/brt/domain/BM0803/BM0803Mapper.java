package com.tracom.brt.domain.BM0803;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0803Mapper extends MyBatisMapper{
	List<MapVO> BM0803G0S0(String filter);
}
