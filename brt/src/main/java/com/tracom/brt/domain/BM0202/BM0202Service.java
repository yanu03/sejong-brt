package com.tracom.brt.domain.BM0202;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.SM0105.CommonCodeDetailInfoVO;
import com.tracom.brt.domain.SM0105.SM0105Mapper;


@Service
public class BM0202Service extends BaseService<DvcHistoryVO, String>{

	@Inject
	private BM0202Mapper mapper;
	
	@Inject
	private SM0105Mapper mapper_0105;
	
	public List<DvcHistoryVO> BM0202G2S0(RequestParams<DvcHistoryVO> requestParams){
		return mapper.BM0202G2S0(requestParams.getString("dvcId"));
	}

	public List<DvcHistoryVO> BM0202G2S1(RequestParams<DvcHistoryVO> requestParams) {
		
		Map<String, String> hm = new HashMap<>();
		hm.put("gridDvcId", requestParams.getString("gridDvcId"));
		hm.put("filter", requestParams.getString("filter"));
		
		return mapper.BM0202G2S1(hm);
	}
	
	public boolean BM0202G2D0(DvcHistoryVO vo) {
		if(mapper.BM0202G2D0(vo) > 0) {
			return true;
		}else {
			return false;
		}
	}

	public boolean BM0202G2U0(DvcHistoryVO vo) {
    	if(mapper.BM0202G2U0(vo) > 0 ) {
    		return true;
    	}else {   		
    		return false;
    	}  	
    	
    }

	public boolean BM0202M0S0(DvcHistoryVO vo) {
		if(mapper.BM0202M0S0(vo.getDvcId()) == null && vo.getWorkType().equals("CD022")) {
			System.out.println("최초설치없습니다.");
    		return true;
    	}else if(mapper.BM0202M0S0(vo.getDvcId()) == null && vo.getWorkType() != "CD022"){
    		System.out.println("최초설치 없지만 워크타입 최초설치 아닌녀석들");
    		return false;
    	}else if(vo.getWorkType().equals("CD022")) {
    			System.out.println("최초설치있습니다.");
    			return false;   			
    		}else{
    			System.out.println("나머지 친구들 인설트");
    			return true;
    		}
    	}  	
	}

