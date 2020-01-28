package com.tracom.brt.domain.BM0601;


import java.util.List;


import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0601Service extends BaseService<WeatAtmoVO, String>{
	
	@Inject
	private BM0601Mapper mapper;

	public List<WeatAtmoVO> BM0601F0S0(RequestParams<WeatAtmoVO> requestParams) {
		System.out.println("service");
		System.out.println(requestParams.getString("measDt"));
		return mapper.BM0601F0S0(requestParams.getString("measDt"));
	}

	public List<WeatAtmoVO> BM0601G1S0(RequestParams<WeatAtmoVO> requestParams) {		
		return mapper.BM0601G1S0(requestParams.getString("filter"));
	}

	public List<WeatAtmoVO> BM0601G1S1(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601G1S1(requestParams.getString("filter"));
	}

	public List<WeatAtmoVO> BM0601G2S1(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601G2S1(requestParams.getString("filter"));
	}

	public List<WeatAtmoVO> BM0601F0S1(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601F0S1(requestParams.getString("filter"));
	}

	public List<WeatAtmoVO> BM0601M0S0(RequestParams<WeatAtmoVO> requestParams) {
		return mapper.BM0601M0S0(requestParams.getString("filter"));
	}
}
