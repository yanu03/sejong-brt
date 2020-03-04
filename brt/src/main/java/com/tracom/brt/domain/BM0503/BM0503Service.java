package com.tracom.brt.domain.BM0503;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0503Service extends BaseService<RoutRsvVO, String> {
    @Inject
    private BM0503Mapper mapper;

    @Inject
    private FTPHandler handler;
    
    public List<RoutRsvVO> BM0503G0S0(RequestParams<RoutRsvVO> requestParams) {
        return mapper.BM0503G0S0(requestParams.getString("filter"));
    }
    
    public List<RoutRsvVO> BM0503G1S0(RequestParams<RoutRsvVO> requestParams){
    	return mapper.BM0503G1S0();
    }
    
    @Transactional
    public void BM0503G1I0(List<VHCInfoVO> vhcVO, List<RoutRsvVO> rsvVO, String rsvDate) throws Exception {
    	//vhcVO는 차량정보
    	//rsvVO 는 노선정보
    	//TODO: 차량정보 리스트를 톨며 노선을 돌리면서 예약을할것임
    	
    	
    	//1. rsv테이블에 삽입 후 rsvId 얻음
    	//2. rsvId얻었으니 rst테이블에 장치별로 삽입
    	
    	//3. 파일생성
    	
    	//rsv테이블 삽입
    	RoutRsvVO vo = new RoutRsvVO();
    	
    	vo.setRsvDate(rsvDate);
    	
    	mapper.BM0503G1I1(vo);
    	
    	String rsvId = vo.getRsvId();
    	List<RoutRsvVO> voList = new ArrayList<>();
    	
    	System.out.println(vhcVO);
    	for(int i = 0; i < vhcVO.size(); i++) {
    		List<RoutRsvVO> list = mapper.vhcMngList(vhcVO.get(i).getVhcId());
    		for(RoutRsvVO v : list) {
    			v.setRsvId(rsvId);
    			//파일 복사 ㄱㄱ
				//v.setImpId(v.getMngId().substring(0, 10));
				//v.setDvcId(v.getMngId().substring(10));
				v.setRsvList(rsvVO);
				
				//System.out.println(v);
				mapper.BM0503G1I0(v);//결과테이블 삽입
				voList.add(v);
				handler.reserveDst(v);//파일이동
    		}
    		//handler.reserveDst(v);//파일이동				
		
    	}
    	//LIST.CSV파일생성
    	System.out.println(voList);
    	//handler.makeDstConfig(voList, rsvVO);
    	handler.makeDstConfig(rsvVO);
    }		
		
		
}