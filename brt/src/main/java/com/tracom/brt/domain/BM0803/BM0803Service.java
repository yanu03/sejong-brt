package com.tracom.brt.domain.BM0803;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0803Service extends BaseService<MapVO, String>{

	@Inject
	private BM0803Mapper mapper;
	
	public List<MapVO> BM0803G0S0(RequestParams<MapVO> requestParams) {
		return mapper.BM0803G0S0(requestParams);
	}
	
}
