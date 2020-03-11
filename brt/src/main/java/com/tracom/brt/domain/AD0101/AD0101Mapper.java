package com.tracom.brt.domain.AD0101;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface AD0101Mapper extends MyBatisMapper{
	List<AdVhcInfoVO> AD0101G1S0(String vhcId);
	int AD0101G1I0(Map<String, Object> params);
	int AD0101G1D0(Map<String, Object> params);
}
