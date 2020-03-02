package com.tracom.brt.domain.BM0609;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0609Mapper extends MyBatisMapper{

	List<ScrRsvVO> BM0609G1S0();
	int BM0609G1I0(ScrRsvVO vo);
	int BM0609G1I1(ScrRsvVO vo);
	String makeScrConfig(String value);
}
