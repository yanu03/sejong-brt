package com.tracom.brt.domain.AD0102;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface AD0102Mapper extends MyBatisMapper{
	List<AdStdPriceVO> AD0102G0S0(String filter);
	int AD0102F0I0(AdStdPriceVO vo);
	int AD0102F0U0(AdStdPriceVO vo);
	int AD0102G0D0(AdStdPriceVO vo);
}
