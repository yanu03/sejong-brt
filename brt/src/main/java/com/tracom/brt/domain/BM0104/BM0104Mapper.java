package com.tracom.brt.domain.BM0104;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface BM0104Mapper extends MyBatisMapper {
	List<BmRoutInfoVO> BM0104G0S0(String filter);
	List<BmRoutNodeInfoVO> BM0104G1S0(Map map);
}
