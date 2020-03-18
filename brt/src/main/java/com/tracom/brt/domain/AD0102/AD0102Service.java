package com.tracom.brt.domain.AD0102;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class AD0102Service extends BaseService<AdStdPriceVO, String>{
	
	@Inject
	private AD0102Mapper mapper;

	public List<AdStdPriceVO> AD0102G0S0(RequestParams<AdStdPriceVO> requestParams) {
		return mapper.AD0102G0S0(requestParams.getString("filter"));
	}

	public String AD0102F0I0(AdStdPriceVO request) {
		mapper.AD0102F0I0(request);
		return request.getPriceId();
	}
	
	public boolean AD0102F0U0(AdStdPriceVO request) {
		if(mapper.AD0102F0U0(request) > 0) {
			return true;
		} else {
			return false;
		}
	}

	public boolean AD0102G0D0(AdStdPriceVO request) {
		if(mapper.AD0102G0D0(request) > 0) {
			return true;
		}else {
			return false;
		}
		
	}

}
