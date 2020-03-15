package com.tracom.brt.domain.AD0104;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.AD0103.AdInstInfoVO;

@Service
public class AD0104Service extends BaseService<AdInstInfoVO, String>{
	
	@Inject
	private AD0104Mapper mapper;

	public List<AdInstInfoVO> AD0104G0S0(RequestParams<AdInstInfoVO> requestParams) {
		Map<String, Object> params = new HashMap<>();
		params.put("filter", requestParams.getString("filter"));
		params.put("stDate", requestParams.getString("stDate"));
		params.put("edDate", requestParams.getString("edDate"));
		
		return mapper.AD0104G0S0(params);
	}
}
