package com.tracom.brt.domain.BM0104;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0104Mapper extends MyBatisMapper {
	List<BmRoutInfoVO> BM0104G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0104G1S0(Map map);
	List<BmRoutInfoVO> BM0104G2S0(BmRoutInfoVO vo);
	int BM0104G3U0(BmRoutInfoVO vo);
	int BM0104G0I0(BmRoutInfoVO insertVO);
	
}
