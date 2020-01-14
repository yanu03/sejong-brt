package com.tracom.brt.domain.BM0107;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

public interface BM0107Mapper extends MyBatisMapper {
	List<BmRoutInfoVO> BM0107G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0107G1S0(Map map);
	//int BM0107G1I0(List<BmRoutNodeInfoVO> voList);
	int BM0107G1I0(BmRoutNodeInfoVO voList);
	int BM0104G3U0(BmRoutInfoVO vo);
}
