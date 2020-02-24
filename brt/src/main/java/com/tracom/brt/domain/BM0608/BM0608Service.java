package com.tracom.brt.domain.BM0608;


import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@EnableScheduling
@Service
public class BM0608Service extends BaseService<BmScrInfoVO, String>{

	@Inject
	private BM0608Mapper mapper;
	
	public List<BmScrInfoVO> BM0608G0S0(RequestParams<BmScrInfoVO> requestParams){
		return mapper.BM0608G0S0(requestParams.getString("filter"));
	}
}
