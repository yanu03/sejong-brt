package com.tracom.brt.domain.AD0102;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class AD0102Service extends BaseService<VhcLocVO, String>{
	
	@Inject
	private AD0102Mapper mapper;

	public List<VhcLocVO> AD0102G1S0(RequestParams<VhcLocVO> requestParams) {
		return mapper.AD0102G1S0(requestParams.getString("vhcId"));
	}

	public boolean AD0102G1I0(VhcLocVO request) {
		if(mapper.AD0102G1I0(request) > 0) {
			return true;
		}else {
			return false;
		}
	}

	public boolean AD0102G1D0(VhcLocVO request) {
		if(mapper.AD0102G1D0(request) > 0) {
			return true;
		}else {
			return false;
		}
		
	}

}
