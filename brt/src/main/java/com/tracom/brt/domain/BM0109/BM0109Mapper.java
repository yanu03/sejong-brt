package com.tracom.brt.domain.BM0109;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

public interface BM0109Mapper extends MyBatisMapper{
	
	List<BmRoutInfoVO> BM0109G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0109G1S0(Map map);
	int BM0109G1I0(BmRoutNodeInfoVO vo);
	int BM0109G1I1(BmRoutNodeInfoVO vo);
	int BM0109G1D0(String value);
	int BM0109G0D0(BmRoutNodeInfoVO vo);
	int BM0109G1D1(String value);
	int BM0109G1I2(BmRoutNodeInfoVO vo);
	int BM0109G1I3(BmRoutNodeInfoVO vo);
	List<BmRoutNodeInfoVO> BM0109G1S1(String value);
	
	List<BmRoutNodeInfoVO> BM0109G1S2(String value);
	int insertNodeInfo(BmRoutNodeInfoVO vo);
	int delNodeInfo(String value);
	
	List<BmRoutNodeInfoVO> getAgInfo(String value);
	int getAgCnt(String value);
}
