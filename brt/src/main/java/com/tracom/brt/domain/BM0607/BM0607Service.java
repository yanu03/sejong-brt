package com.tracom.brt.domain.BM0607;


import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@EnableScheduling
@Service
public class BM0607Service extends BaseService<VdoRsvVO, String>{

	@Inject
	private BM0607Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	public List<VdoRsvVO> BM0607G1S0(){
		return mapper.BM0607G1S0();
	}

	@Transactional
	public void BM0607G1I0(VdoRsvVO vo) throws Exception {
		for(VdoRsvVO v : vo.getVoList()) {
			v.setRsvDate(vo.getRsvDate());
			v.setOrgaId(vo.getOrgaId());
			
			if(mapper.BM0607G1I0(v) > 0) {
				if(mapper.BM0607G1I1(v) > 0) {
					//TODO:
					v.setImpId(v.getMngId().substring(0, 10));
					v.setDvcId(v.getMngId().substring(10));
					handler.reserveVideo(v);
				}
			}
			
			
		}
	}
}
