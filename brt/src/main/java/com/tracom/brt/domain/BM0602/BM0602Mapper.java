package com.tracom.brt.domain.BM0602;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0602Mapper extends MyBatisMapper{

	List<NewsVO> BM0602G0S0(String filter);
	String BM0602F0I0(NewsVO vo);
	
}