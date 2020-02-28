package com.tracom.brt.domain.BM0801;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0601.WeatAtmoVO;

@Service
public class BM0801Service extends BaseService<StatisticsVO, String>{
	
	@Inject
	private BM0801Mapper mapper;

	public List<StatisticsVO> BM0801G0S0(RequestParams<StatisticsVO> requestParams) {
		return mapper.BM0801G0S0(requestParams.getString("filter"));
	}

	public List<StatisticsVO> BM0801G0S1(RequestParams<StatisticsVO> requestParams) {
		return mapper.BM0801G0S1(requestParams.getString("filter"));
	}
}
