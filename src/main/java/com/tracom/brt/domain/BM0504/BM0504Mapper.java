package com.tracom.brt.domain.BM0504;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0205.VhcDvcUpdateVO;

public interface BM0504Mapper extends MyBatisMapper{

	//List<VhcDvcUpdateVO> BM0205G0S0(String filter);
	List<VhcDvcUpdateVO> BM0504G0S0(Map map);
	int BM0504Reservation(VhcDvcUpdateVO vo);
	int BM0504FileUp(VhcDvcUpdateVO vo);
	List<VhcDvcUpdateVO> BM0504G0S1(VhcDvcUpdateVO vo);
	VhcDvcUpdateVO BM0504S0(Map<String, String> map);
	int BM0504I0(VhcDvcUpdateVO nVo);
}
