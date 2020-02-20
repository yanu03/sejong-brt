package com.tracom.brt.domain.BM0205;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0205Mapper extends MyBatisMapper{

	List<VhcDvcUpdateVO> BM0205G0S0(String filter);
	int BM0205Reservation(VhcDvcUpdateVO vo);
	int BM0205FileUp(VhcDvcUpdateVO vo);
	List<VhcDvcUpdateVO> BM0205G0S1(VhcDvcUpdateVO vo);
	VhcDvcUpdateVO BM0205S0(Map<String, String> map);
	int BM0205I0(VhcDvcUpdateVO nVo);
}
