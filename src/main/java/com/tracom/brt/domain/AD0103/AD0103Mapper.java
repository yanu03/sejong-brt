package com.tracom.brt.domain.AD0103;

import java.util.List;
import java.util.Map;

import com.chequer.axboot.core.mybatis.MyBatisMapper;

public interface AD0103Mapper extends MyBatisMapper{
	
	List<AdInstDlVO> AD0103G0S0(String filter);
	List<AdInstDlVO> AD0103G0S1(Map<String, Object> params);
	List<AdInstInfoVO> AD0103G1S0(String filter);
	int AD0103F0I0(AdInstInfoVO params);
	int AD0103F0U0(AdInstInfoVO params);
	int AD0103G0I0(AdInstInfoVO params);
	int AD0103G0D0(AdInstInfoVO params);
	int AD0103G1U0(AdInstInfoVO params);
	int AD0103G1D0(AdInstInfoVO params);
}
