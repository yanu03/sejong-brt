package com.tracom.brt.domain.BM0503;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0503Mapper extends MyBatisMapper {
	List<RoutRsvVO> BM0503G0S0(String filter);
	List<RoutRsvVO> BM0503G1S0();
}
