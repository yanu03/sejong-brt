package com.tracom.brt.domain.BM0608;


import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.handler.FTPHandler;

@EnableScheduling
@Service
public class BM0608Service extends BaseService<BmScrInfoVO, String>{

	@Inject
	private BM0608Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
	public List<BmScrInfoVO> BM0608G0S0(RequestParams<BmScrInfoVO> requestParams){
		return mapper.BM0608G0S0(requestParams.getString("filter"));
	}
	
	public String BM0608F0I0(BmScrInfoVO request) {
		if(mapper.BM0608F0I0(request) > 0) {
			if(handler.uploadBM0608(request)) {
				return request.getSetId();
			}else {
				return "";
			}
		}else {
			return "";
		}
	}
	
	public boolean BM0608F0U0(BmScrInfoVO request) {
		if(handler.uploadBM0608(request)) {
			if(mapper.BM0608F0U0(request) > 0) {
				return true;
			}else {
				return false;
			}
		}else {
			return false;
		}
	}
	
	public boolean BM0608G0D0(BmScrInfoVO request) {
		if(mapper.BM0608G0D0(request) > 0) {
			return true;
		}else {
			return false;
		}
	}
}
