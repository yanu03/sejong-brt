package com.tracom.brt.domain.AD0103;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

public interface AD0103Mapper extends MyBatisMapper{
	
	List<BmRoutInfoVO> BM0804G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0804G1S0(Map map);
	int BM0804G1I0(BmRoutNodeInfoVO vo);
	int BM0804G1I1(BmRoutNodeInfoVO vo);
	int BM0804G1D0(String value);
	int BM0804G0D0(BmRoutNodeInfoVO vo);
}
