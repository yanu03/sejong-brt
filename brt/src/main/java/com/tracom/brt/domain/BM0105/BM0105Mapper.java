package com.tracom.brt.domain.BM0105;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

public interface BM0105Mapper extends MyBatisMapper {
	List<BmStaInfoVO> BM0105G1S0(Map<String, String> map);
	int BM0105G1D0(String routId);
	int BM0105G1I0(BmStaInfoVO vo);
	int BM0105G1I1(BmStaInfoVO vo);
	
	List<BmRoutNodeInfoVO> getStaList(BmRoutInfoVO vo);
	List<BmRoutNodeInfoVO> getNodeList(BmRoutInfoVO vo);
	
	List<BmStaInfoVO> getNewStaList(BmStaInfoVO vo);

}
