package com.tracom.brt.domain.BM0608;

import java.util.List;

import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;

public interface BM0608Mapper extends MyBatisMapper{
	
	List<BmScrInfoVO> BM0608G0S0(String value);
}
