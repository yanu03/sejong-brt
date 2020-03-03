package com.tracom.brt.domain.BM0104;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0104Mapper extends MyBatisMapper {
	List<BmRoutInfoVO> BM0104G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0104G1S0(Map map);
	List<BmRoutInfoVO> BM0104G2S0(BmRoutInfoVO vo);
	int BM0104G0U0(BmRoutInfoVO vo);
	int BM0104G0I0(BmRoutInfoVO insertVO);
	int BM0104G0U2(BmRoutInfoVO voList);
	
	int BM0104F0S1(BmRoutInfoVO vo);
	int BM0104F0I0(BmRoutInfoVO vo);
	int BM0104F0U0(BmRoutInfoVO vo);
	
	int BM0104F0D0(BmRoutInfoVO vo);

	String BM0104G1S2(BmRoutInfoVO vo);
	
	List<BmRoutInfoVO> getRoutIdByinterId(BmRoutInfoVO vo);
	
	//
	List<BmRoutInfoVO> getMyRout(BmRoutInfoVO vo);
	
	int insertRout(BmRoutInfoVO vo);
	int updateRout(BmRoutInfoVO vo);
}
