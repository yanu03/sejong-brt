package com.tracom.brt.domain.SM0105;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.gargoylesoftware.htmlunit.javascript.host.Console;
import com.tracom.brt.domain.BaseService;

@Service
public class SM0105Service extends BaseService<CommonCodeDetailInfoVO, String> {
	@Inject
	private SM0105Mapper mapper;
	
    public List<CommonCodeDetailInfoVO> SM0105G1S0(RequestParams<CommonCodeDetailInfoVO> requestParams) {
        return mapper.SM0105G1S0(requestParams.getString("coCd"));
    }
    
    public boolean SM0105F0S0(CommonCodeDetailInfoVO vo) {
		if(mapper.SM0105F0S0(vo.getDlCd()) == null) {
			return true;
		} else {
			return false;
		}
	}
    
    public String SM0105F0I0(CommonCodeDetailInfoVO vo) {
    	mapper.SM0105F0I0(vo);
    	return vo.getDlCd();
    }
    
    public boolean SM0105F0U0(CommonCodeDetailInfoVO vo) {
    	if(mapper.SM0105F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean SM0105G1D0(CommonCodeDetailInfoVO vo) {
    	if(mapper.SM0105G1D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public CommonCodeDetailInfoVO SM0105G1S1(CommonCodeDetailInfoVO vo) {
    	return mapper.SM0105G1S1(vo);
    }
    
    public List<CommonCodeDetailInfoVO> SM0105G1S2(RequestParams<CommonCodeDetailInfoVO> requestParams){
    	CommonCodeDetailInfoVO vo = new CommonCodeDetailInfoVO();
    	vo.setCoCd(requestParams.getString("coCd"));
    	return mapper.SM0105G1S2(vo);
    }
    
    public List<CommonCodeDetailInfoVO> SM0105G3S0(){
    	return mapper.SM0105G3S0();
    }
}