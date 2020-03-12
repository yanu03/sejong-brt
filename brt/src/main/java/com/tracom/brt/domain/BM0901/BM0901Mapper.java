package com.tracom.brt.domain.BM0901;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0901Mapper extends MyBatisMapper{
	List<ElecRouterVO> BM0901G0S0(String value);
	int BM0901G0I0(ElecRouterVO vo);
	int BM0901G0U0(ElecRouterVO vo);
	int BM0901G0D0(ElecRouterVO vo);
}
