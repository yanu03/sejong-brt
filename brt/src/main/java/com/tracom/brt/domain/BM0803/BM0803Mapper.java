package com.tracom.brt.domain.BM0803;

import com.chequer.axboot.core.api.response.Responses.ListResponse;
import com.chequer.axboot.core.mybatis.MyBatisMapper;
import com.chequer.axboot.core.parameter.RequestParams;

public interface BM0803Mapper extends MyBatisMapper{

	ListResponse BM0803G0S0();
	
}
