package com.tracom.brt.domain.BM0601;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.jdo.annotations.Transactional;

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

	@Transactional
	public String BM0601M0I0(WeatAtmoVO request) {
		Map<String, String> timeSet = new HashMap<>();
		Map<String, String> weatUrl = new HashMap<>();
		Map<String, String> atmoUrl = new HashMap<>();
		Map<String, String> weatApiKey = new HashMap<>();
		Map<String, String> atmoApiKey = new HashMap<>();
		
		timeSet.put("numVal4", request.getNumVal4());
		timeSet.put("numVal5", request.getNumVal5());
		timeSet.put("numVal6", request.getNumVal6());
		weatUrl.put("remarkWeat" , request.getRemarkWeat());
		atmoUrl.put("remarkAtmo" , request.getRemarkAtmo());
		weatApiKey.put("weatApiKey" , request.getWeatApiKey());
		atmoApiKey.put("atmoApiKey" , request.getAtmoApiKey());
		
		mapper.BM0601M0I0(timeSet);
		mapper.BM0601M0U1(weatUrl);
		mapper.BM0601M0U2(atmoUrl);
		mapper.BM0601M0U3(weatApiKey);
		mapper.BM0601M0U4(atmoApiKey);
		
		return request.getDvcId();
	}
}
