package com.tracom.brt.domain.BM0106;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0105.BmStaInfoVO;

public interface BM0106Mapper extends MyBatisMapper {
	List<BmStaNmInfoVO> BM0106G0S0(String filter);
	int BM0106G0S1(String staId);
	int BM0106F0I0(BmStaNmInfoVO vo);
	int BM0106F0U0(BmStaNmInfoVO vo);
	int BM0106G0D0(BmStaNmInfoVO vo);
	List<BmStaInfoVO> getSwpList();
	int deleteStaInfo(BmStaInfoVO vo);
	int deleteStaNmInfo(BmStaInfoVO vo);
	
	int uptLineCnt(BmStaNmInfoVO vo);
}
