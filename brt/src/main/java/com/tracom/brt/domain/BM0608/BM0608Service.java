package com.tracom.brt.domain.BM0608;


import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@EnableScheduling
@Service
public class BM0608Service extends BaseService<BmScrInfoVO, String>{

	@Inject
	private BM0608Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	public List<BmScrInfoVO> BM0608G0S0(RequestParams<BmScrInfoVO> requestParams){
		return mapper.BM0608G0S0(requestParams.getString("filter"));
	}
	
	public String BM0608F0I0(BmScrInfoVO request) {
		if(mapper.BM0608F0I0(request) > 0) {
			return request.getSetId();
		}else {
			return "";
		}
	}
	
	public boolean BM0608F0U0(BmScrInfoVO request) {
		if(handler.uploadBM0608(request)) {
			if(mapper.BM0608F0U0(request) > 0) {
				return true;
			}else {
				return false;
			}
		}else {
			return false;
		}
	}
	
	public List<BmScrInfoVO> makeData(BmScrInfoVO vo){
		List<BmScrInfoVO> list = new ArrayList<>();
		String arr[] = vo.getFontColor().split(",");
		
		/*
		String c1 	= "정류소안내";
		String c1r1 = "이번정류소명";
		String c1r2	= "영문";
		String c1r3 = "다음정류소명";
		String c1r4 = "영문";
		String c2	= "현정류소";
		String c2r1	= "정류소명";
		String c3	= "뉴스표시부";
		String c3r1 = "뉴스";
		String c3r2 = "정류장안내";
		ax.admin.BM0608G1.c4=날짜/시간
		ax.admin.BM0608G1.c4r1=년도
		ax.admin.BM0608G1.c4r2=월
		ax.admin.BM0608G1.c4r3=일
		ax.admin.BM0608G1.c4r4=시간
		ax.admin.BM0608G1.c5=기상정보
		ax.admin.BM0608G1.c5r1=기상상태
		ax.admin.BM0608G1.c5r2=현재온도
		ax.admin.BM0608G1.c5r3=최저기온
		ax.admin.BM0608G1.c5r4=최고기온
		ax.admin.BM0608G1.c5r5=습도
		ax.admin.BM0608G1.c5r6=강수확률
		ax.admin.BM0608G1.c5r7=강수량
		ax.admin.BM0608G1.c6=대기정보
		ax.admin.BM0608G1.c6r1=미세먼지농도
		ax.admin.BM0608G1.c6r2=초미세먼지농도
		ax.admin.BM0608G1.c6r3=아황산가스농도
		ax.admin.BM0608G1.c6r4=일산화탄소농도
		ax.admin.BM0608G1.c6r5=오존농도
		ax.admin.BM0608G1.c6r6=이산화질소농도
		ax.admin.BM0608G1.c7=노선번호
		ax.admin.BM0608G1.c7r1=노선번호
		ax.admin.BM0608G1.c7r2=행선지
		String 
		new 
		list.add(makeRow(""))
		for(int i=0; i<26; i++) {
			
		}
		 */
		return null;
	}
	public BmScrInfoVO makeRow(String c, String r) {
		BmScrInfoVO vo = new BmScrInfoVO();
		vo.setC(c);
		vo.setR(r);
		return vo;
	}
}
