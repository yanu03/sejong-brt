package com.tracom.brt.domain.BM0608;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0608Mapper extends MyBatisMapper{
	
	List<BmScrInfoVO> BM0608G0S0(String value);
	int BM0608F0I0(BmScrInfoVO vo);
	int BM0608F0U0(BmScrInfoVO vo);
}
