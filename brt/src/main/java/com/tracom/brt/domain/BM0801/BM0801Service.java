package com.tracom.brt.domain.BM0801;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0801Service extends BaseService<StatisticsVO, String>{
	
	@Inject
	private BM0801Mapper mapper;
	
	@Inject
	private FTPHandler handler;

	public List<StatisticsVO> BM0801G0S0(RequestParams<StatisticsVO> requestParams) {
		Map<String, String> hm = new HashMap<>();
		hm.put("filter", requestParams.getString("filter"));
		hm.put("playStDate", requestParams.getString("playStDate"));
		hm.put("playEdDate", requestParams.getString("playEdDate"));
		
		return mapper.BM0801G0S0(hm);
	}
	
	public void insertAdLog() {
		try {
			handler.processAdLog();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
