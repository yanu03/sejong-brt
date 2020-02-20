package com.tracom.brt.domain.BM0804;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

public interface BM0804Mapper extends MyBatisMapper{
	
	List<BmRoutInfoVO> BM0804G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0804G1S0(Map map);
}
