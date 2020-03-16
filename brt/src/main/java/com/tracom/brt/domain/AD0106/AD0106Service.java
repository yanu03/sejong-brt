package com.tracom.brt.domain.AD0106;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.AD0103.AdInstDlVO;
import com.tracom.brt.domain.AD0103.AdInstInfoVO;

@Service
public class AD0106Service extends BaseService<AdInstInfoVO, String>{
	
	@Inject
	private AD0106Mapper mapper;

	public List<AdInstDlVO> AD0106G0S0(RequestParams<AdInstDlVO> requestParams) {
		Map<String, Object> params = new HashMap<>();
		params.put("date", requestParams.getString("date"));
		
		return mapper.AD0106G0S0(params);
	}
}
