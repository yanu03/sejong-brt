package com.tracom.brt.domain.BM0801;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tracom.brt.domain.BaseService;

@Service
public class BM0801Service extends BaseService<StatisticsVO, String>{
	
	@Inject
	private BM0801Mapper mapper;
}
