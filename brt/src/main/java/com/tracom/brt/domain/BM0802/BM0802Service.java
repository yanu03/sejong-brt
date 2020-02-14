package com.tracom.brt.domain.BM0802;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.tracom.brt.domain.BaseService;

@Service
public class BM0802Service extends BaseService<RaceHistoryVO, String>{
	
	@Inject
	private BM0802Mapper mapper;
}
