package com.tracom.brt.domain.BM0804;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutNodeInfoVO;

@Service
public class BM0804Service extends BaseService<BmRoutInfoVO, String>{
	
	@Inject
	private BM0804Mapper mapper;
	
	//좌측상단 그리드 select
	public List<BmRoutInfoVO> BM0804G0S0(RequestParams<BmRoutInfoVO> requestParams){
		return mapper.BM0804G0S0(requestParams.getString("filter"));
	}
	
	//좌측하단 그리드 select
	public List<BmRoutNodeInfoVO> BM0804G1S0(RequestParams<BmRoutNodeInfoVO> requestParams){
    	HashMap<String, String> map = new HashMap<String, String>();
    	map.put("routId", requestParams.getString("routId"));
    	map.put("filter1", requestParams.getString("filter1"));
		return mapper.BM0804G1S0(map);
	}
}
