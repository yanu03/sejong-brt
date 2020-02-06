package com.tracom.brt.domain.BM0107;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

public interface BM0107Mapper extends MyBatisMapper {
	List<BmRoutInfoVO> BM0107G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0107G1S0(Map map);
	int BM0104G3U0(BmRoutInfoVO vo);
	List<BmRoutNodeInfoVO> BM0107M0S0(BmRoutInfoVO vo);
	int BM0107G1D0(BmRoutInfoVO vo);
	
	int BM0107G2D0(BmRoutInfoVO vo);
	int BM0107G2I0(BmRoutInfoVO vo);
	int BM0107G1I0(BmRoutNodeInfoVO voList);
	int BM0107G3I1(BmRoutNodeInfoVO voList);
	int BM0107G3D0(BmRoutInfoVO vo);
	
	List<BmRoutNodeInfoVO> BM0107G4S0(BmRoutInfoVO vo);
	
	int BM0107G1D1(BmRoutInfoVO vo);
}
