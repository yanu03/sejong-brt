package com.tracom.brt.domain.SM0109;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.OpenAPI.OpenAPIService;

@Service
public class SM0109Service extends BaseService<ApiVO, String> {
    @Inject
    private SM0109Mapper mapper;
    
    @Inject
    private OpenAPIService apiService;
    
    public List<ApiVO> SM0109G0S0(RequestParams<ApiVO> requestParams) {
        return mapper.SM0109G0S0(requestParams.getString("filter"));
    }

    public String SM0109F0I0(ApiVO vo) {
    	String apiKey = makeKey(vo);
    	vo.setApiKey(apiKey);
    	mapper.SM0109F0I0(vo);
    	return vo.getApiId();
    }
    
    public boolean SM0109F0U0(ApiVO vo) {
    	if(mapper.SM0109F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean SM0109G0D0(ApiVO vo) {
    	if(mapper.SM0109G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean ApiCallHis(ApiCallHisVO vo) {
    	if(mapper.ApiCallHis(vo) > 0) {
    		return true;
    	}else {
    		return false;
    	}
    }
    
    private String makeKey(ApiVO vo) {
    	String ip = vo.getAllowedIp();
    	String endPoint = vo.getApiEndPoint();
    	
    	return apiService.makeHash(ip, endPoint);
    }
}