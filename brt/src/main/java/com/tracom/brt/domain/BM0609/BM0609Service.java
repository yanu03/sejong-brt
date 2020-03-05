package com.tracom.brt.domain.BM0609;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@EnableScheduling
@Service
public class BM0609Service extends BaseService<ScrRsvVO, String>{

	@Inject
	private BM0609Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	public List<ScrRsvVO> BM0609G1S0(){
		return mapper.BM0609G1S0();
	}

	
	@Transactional
	public void BM0609G1I0(ScrRsvVO vo) throws Exception {
		for(ScrRsvVO v : vo.getVoList()) {
			v.setRsvDate(vo.getRsvDate());
			v.setSetId(vo.getSetId());
			
			if(mapper.BM0609G1I0(v) > 0) {
				if(mapper.BM0609G1I1(v) > 0) {
					//TODO:
					v.setImpId(v.getMngId().substring(0, 10));
					v.setDvcId(v.getMngId().substring(10));
					handler.reserveScreen(v);
				}
			}
		}
	}

	@Transactional
	public List<ScrRsvVO> makeConfig(ScrRsvVO vo){
		String fontColor = mapper.makeScrConfig(vo.getSetId());

		String col1[] = makeCol1();
		String col2[] = fontColor.split(",");

		List<ScrRsvVO> result = new ArrayList<>();
		for(int i=0; i < col1.length; i++) {
			ScrRsvVO v = new ScrRsvVO();
			v.setCol1(col1[i]);
			v.setCol2(col2[i]);
			result.add(v);
		}
		return result;
	}
	
	public String[] makeCol1() {
		String col1[] = new String[26];
		col1[0] = "1001";
		col1[1] = "1002";
		col1[2] = "1003";
		col1[3] = "1004";
		col1[4] = "1101";
		col1[5] = "2001";
		col1[6] = "2002";
		col1[7] = "3101";
		col1[8] = "3102";
		col1[9] = "3103";
		col1[10] = "3104";
		col1[11] = "3201";
		col1[12] = "3202";
		col1[13] = "3203";
		col1[14] = "3204";
		col1[15] = "3205";
		col1[16] = "3206";
		col1[17] = "3207";
		col1[18] = "3301";
		col1[19] = "3302";
		col1[20] = "3303";
		col1[21] = "3304";
		col1[22] = "3305";
		col1[23] = "3306";
		col1[24] = "3401";
		col1[25] = "3402";
		
		return col1;
	}
}
