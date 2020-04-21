package com.tracom.brt.domain.BM0902;


import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@EnableScheduling
@Service
public class BM0902Service extends BaseService<EdRsvVO, String>{

	@Inject
	private BM0902Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	public List<EdRsvVO> BM0902G1S0(){
		return mapper.BM0902G1S0();
	}

	//전자노선도 예약
	@Transactional
	public void BM0902G1I0(EdRsvVO vo) throws Exception{
		for(EdRsvVO v : vo.getVoList()) {
			v.setRsvDate(vo.getRsvDate());
			v.setSetId(vo.getSetId());
			
			
			if(mapper.BM0902G1I0(v) > 0){
				if(mapper.BM0902G1I1(v) > 0) {
					v.setImpId(v.getMngId().substring(0,10));
					v.setDvcId(v.getMngId().substring(10));
					System.out.println(v);
					handler.reserveED(v);
				}
			}
			
		}
	}
	
}
