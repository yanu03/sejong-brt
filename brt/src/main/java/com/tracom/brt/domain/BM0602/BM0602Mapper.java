package com.tracom.brt.domain.BM0602;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0602Mapper extends MyBatisMapper{

	List<NewsVO> BM0602G0S0(String filter);
	int BM0602F0I0(NewsVO vo);
	int BM0602G0D0(NewsVO vo);
	int BM0602F0U0(NewsVO vo);
	
}
