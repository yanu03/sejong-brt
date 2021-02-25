package com.tracom.brt.domain.BM0503;

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
    	
    	//rsv테이블 삽입
    	RoutRsvVO vo = new RoutRsvVO();
    	
    	vo.setRsvDate(rsvDate);
    	
    	mapper.BM0503G1I1(vo);
    	
    	String rsvId = vo.getRsvId();
    	List<RoutRsvVO> voList = new ArrayList<>();
    	
    	for(int i=0; i<vhcVO.size(); i++) {
    		//차량별 장치코드리스트
    		List<DvcCodeVO> dlist = mapper.selectDvcCd(vhcVO.get(i));
    		//예약해야할노선리스트
			for(int f=0; f<rsvVO.size(); f++) {
				RoutRsvVO v = rsvVO.get(f);
				handler.reserveDst(v, dlist, vhcVO.get(i));
    		}
			
			List<RoutRsvVO> list = mapper.vhcMngList(vhcVO.get(i).getVhcId());
    		for(RoutRsvVO v : list) {
    			v.setRsvId(rsvId);
				v.setImpId(v.getMngId().substring(0, 10));
				v.setDvcId(v.getMngId().substring(10));
				v.setRsvList(rsvVO);
				
				mapper.BM0503G1I0(v);//결과테이블 삽입
				voList.add(v);
    		}
    		
    	}
    	//list.csv파일 생성
    	handler.makeDstConfig(vhcVO, rsvVO);
    }		
		
		
}