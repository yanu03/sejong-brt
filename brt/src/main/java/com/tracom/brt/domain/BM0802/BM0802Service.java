package com.tracom.brt.domain.BM0802;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0802Service extends BaseService<RaceHistoryVO, String>{
	
	@Inject
	private BM0802Mapper mapper;

	public List<RaceHistoryVO> BM0802G0S0(RequestParams<RaceHistoryVO> requestParams) {
		return mapper.BM0802G0S0(requestParams.getString("filter"));
	}
}
