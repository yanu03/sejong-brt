package com.tracom.brt.domain.BM0206;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0202.DvcHistoryVO;

@Service
public class BM0206Service extends BaseService<UpdateHistoryVO, String>{
	
	@Inject
	private BM0206Mapper mapper;
	public List<UpdateHistoryVO> BM0206G2S0(RequestParams<UpdateHistoryVO> requestParams) {
		return mapper.BM0206G2S0(requestParams.getString("dvcId"));
	}
	
public List<UpdateHistoryVO> BM0206G2S1(RequestParams<UpdateHistoryVO> requestParams) {
		
		Map<String, String> hm = new HashMap<>();
		hm.put("gridDvcId", requestParams.getString("gridDvcId"));
		hm.put("filter", requestParams.getString("filter"));
		
		return mapper.BM0206G2S1(hm);
	}	
}
