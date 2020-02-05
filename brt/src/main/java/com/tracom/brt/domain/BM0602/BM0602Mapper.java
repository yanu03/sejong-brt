package com.tracom.brt.domain.BM0602;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;

public interface BM0602Mapper extends MyBatisMapper{

	List<NewsVO> BM0602G0S0(String filter);
	List<NewsVO> BM0602M0S0(String filter);
	List<NewsVO> BM0602F0S0(NewsVO vo);
	int BM0602F0I0(NewsVO vo);
	int BM0602G0D0(NewsVO vo);
	int BM0602F0U0(NewsVO vo);
	int BM0602M0I0(NewsVO vo);
	int BM0602G0I0(NewsVO vo);
	String BM0602D0(String deleteDate);
}
