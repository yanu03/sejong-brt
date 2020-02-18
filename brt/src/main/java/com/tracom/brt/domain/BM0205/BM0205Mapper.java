package com.tracom.brt.domain.BM0205;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.chequer.axboot.core.parameter.RequestParams;

public interface BM0205Mapper extends MyBatisMapper{

	List<VhcDvcUpdateVO> BM0205G0S0(String filter);
	List<VhcDvcUpdateVO> BM0205Reservation(VhcDvcUpdateVO vo);
	int BM0205FileUp(VhcDvcUpdateVO vo);
	List<VhcDvcUpdateVO> BM0205G0S1(VhcDvcUpdateVO vo);
}
