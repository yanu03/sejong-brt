package com.tracom.brt.domain.BM0203;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0203Service extends BaseService<DvcConditionVO, String>{
	
	@Inject
	private BM0203Mapper mapper;

	public List<DvcConditionVO> BM0203G0S0(RequestParams<DvcConditionVO> requestParams) {
		return mapper.BM0203G0S0(requestParams.getString("filter"));
	}
	
	public List<DvcConditionVO> BM0203G1S0(RequestParams<DvcConditionVO> requestParams) {
		return mapper.BM0203G1S0(requestParams.getString("vhcId"));
	}
}
