package com.tracom.brt.domain.BM0603;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0602.NewsVO;

public interface BM0603Mapper extends MyBatisMapper{

	List<NewsVO> BM0603G0S0(String filter);
	int BM0603F0I0(NewsVO vo);
	int BM0603F0U0(NewsVO vo);
	
}
