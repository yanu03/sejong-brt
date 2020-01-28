package com.tracom.brt.domain.BM0601;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0601Mapper extends MyBatisMapper{

	List<WeatAtmoVO> BM0601F0S0(String measDt);
	List<WeatAtmoVO> BM0601G1S0(String filter);
	List<WeatAtmoVO> BM0601G1S1(String filter);
	List<WeatAtmoVO> BM0601G2S1(String filter);
	List<WeatAtmoVO> BM0601F0S1(String filter);
	List<WeatAtmoVO> BM0601M0S0(String filter);
}
