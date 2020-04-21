package com.tracom.brt.domain.AD0101;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.BM0103.VHCInfoVO;
import com.tracom.brt.domain.BM0104.BmRoutInfoVO;

@Service
public class AD0101Service extends BaseService<AdVhcInfoVO, String>{
	
	@Inject
	private AD0101Mapper mapper;
	
	public List<AdVhcInfoVO> AD0101G1S0(RequestParams<VHCInfoVO> requestParams){
		return mapper.AD0101G1S0(requestParams.getString("vhcId"));
	}
	
	@Transactional
	public void AD0101G1I0(Map<String, Object> params) {
		mapper.AD0101G1D0(params);
		
		if(((List<Map<String, Object>>) params.get("posList")).size() != 0) {
			mapper.AD0101G1I0(params);
		}
	}
}
