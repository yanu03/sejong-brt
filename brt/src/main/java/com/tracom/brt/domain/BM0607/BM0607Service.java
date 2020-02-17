package com.tracom.brt.domain.BM0607;


import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import com.tracom.brt.domain.BaseService;

@EnableScheduling
@Service
public class BM0607Service extends BaseService<VdoRsvVO, String>{

	@Inject
	private BM0607Mapper mapper;
	
	public List<VdoRsvVO> BM0607G1S0(){
		return mapper.BM0607G1S0();
	}

	public int BM0607G1I0() {
		return mapper.BM0607G1I0();
	}
}
