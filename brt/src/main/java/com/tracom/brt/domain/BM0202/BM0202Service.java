package com.tracom.brt.domain.BM0202;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;


@Service
public class BM0202Service extends BaseService<DvcHistoryVO, String>{

	@Inject
	private BM0202Mapper mapper;
	
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
		String dvcVo = vo.getWorkType();
		System.out.println(dvcVo);
		System.out.println(vo);
		mapper.BM0202M0S0(vo);
		System.out.println(vo.getWorkType());
		if(dvcVo != vo.getWorkType()) {
			System.out.println("최초설치없습니다.");
    		return true;
    	}else {
    		System.out.println("최초설치있습니다.");
    		return false;
    	}  	
	}

}
