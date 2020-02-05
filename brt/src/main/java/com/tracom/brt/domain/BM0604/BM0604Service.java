package com.tracom.brt.domain.BM0604;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0602.NewsVO;

@Service
public class BM0604Service extends BaseService<NewsVO, String>{

	@Inject
	private BM0604Mapper mapper;
	
	public List<NewsVO> BM0604G0S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0604G0S0(requestParams.getString("filter"));
	}

	public List<NewsVO> BM0604G0S1(RequestParams<NewsVO> requestParams) {
		return mapper.BM0604G0S1(requestParams.getString("filter"));
	}

	public List<NewsVO> BM0604G1S0(RequestParams<NewsVO> requestParams) {
		return mapper.BM0604G1S0(requestParams.getString("filter"));
	}
	
}
