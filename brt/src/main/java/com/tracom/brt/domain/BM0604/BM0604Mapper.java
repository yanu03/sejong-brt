package com.tracom.brt.domain.BM0604;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0602.NewsVO;

public interface BM0604Mapper extends MyBatisMapper	{

	List<NewsVO> BM0604G0S0(String filter);
	List<NewsVO> BM0604G0S1(String filter);
	List<NewsVO> BM0604G1S0(String filter);
	int BM0604F0U0(NewsVO vo);
	int BM0604F0U1(NewsVO vo);
}
