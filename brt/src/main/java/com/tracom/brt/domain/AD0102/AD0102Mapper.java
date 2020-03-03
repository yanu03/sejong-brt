package com.tracom.brt.domain.AD0102;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface AD0102Mapper extends MyBatisMapper{

	List<VhcLocVO> AD0102G1S0(String filter);
	int AD0102G1I0(VhcLocVO vo);
	int AD0102G1D0(VhcLocVO vo);

}
