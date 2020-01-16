package com.tracom.brt.domain.BM0205;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0205Mapper extends MyBatisMapper{

	List<VhcDvcUpdateVO> BM0205G0S0(String filter);
	List<VhcDvcUpdateVO> BM0205Reservation(String filter);
	int BM0205F0I0(VhcDvcUpdateVO vo);
}
