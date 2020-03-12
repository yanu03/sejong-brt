package com.tracom.brt.domain.AD0103;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class AD0103Service extends BaseService<AdInstInfoVO, String>{
	
	@Inject
	private AD0103Mapper mapper;
	
	public List<AdInstDlVO> AD0103G0S0(RequestParams<AdInstInfoVO> requestParams){
		return mapper.AD0103G0S0(requestParams.getString("filter"));
	}
	
	public List<AdInstDlVO> AD0103G0S1(RequestParams<AdInstInfoVO> requestParams) {
		String instId = requestParams.getString("instId");
		String priceType = requestParams.getString("priceType");
		
		Map<String, Object> params = new HashMap<>();
		params.put("instId", instId);
		params.put("priceType", priceType);
		
		return mapper.AD0103G0S1(params);
	}
	
	public List<AdInstInfoVO> AD0103G1S0(RequestParams<AdInstInfoVO> requestParams){
		return mapper.AD0103G1S0(requestParams.getString("filter"));
	}
	
	@Transactional
	public String AD0103F0I0(AdInstInfoVO params) {
		mapper.AD0103F0I0(params);
		if(params.getList() != null && params.getList().size() != 0) {
			mapper.AD0103G0I0(params);
		}
		
		return params.getInstId();
	}
	
	@Transactional
	public void AD0103F0U0(AdInstInfoVO params) {
		mapper.AD0103G0D0(params);
		mapper.AD0103F0U0(params);
		if(params.getList() != null && params.getList().size() != 0) {
			mapper.AD0103G0I0(params);
		}
	}
	
	public boolean AD0103G1U0(AdInstInfoVO params) {
		if(mapper.AD0103G1U0(params) > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	public boolean AD0103G1D0(AdInstInfoVO params) {
		if(mapper.AD0103G1D0(params) > 0) {
			return true;
		} else {
			return false;
		}
	}
}
