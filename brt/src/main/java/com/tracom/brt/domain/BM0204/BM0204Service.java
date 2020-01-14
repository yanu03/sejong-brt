package com.tracom.brt.domain.BM0204;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0203.DvcConditionVO;

@Service
public class BM0204Service extends BaseService<ObeConditionVO, String>{
	
	@Inject
	private BM0204Mapper mapper;
	
	public List<ObeConditionVO> BM0204G0S0(RequestParams<ObeConditionVO> requestParams) {
		return mapper.BM0204G0S0(requestParams.getString("filter"));
	}
	
}
