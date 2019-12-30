package com.tracom.brt.domain.SM0104;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class SM0104Service extends BaseService<CommonCodeInfoVo, String> {
	@Inject
    private SM0104Mapper mapper;

	public List<CommonCodeInfoVo> SM0104G0S0(RequestParams<CommonCodeInfoVo> requestParams) {
        return mapper.SM0104G0S0(requestParams.getString("filter"));
    }
	
	public boolean SM0104F0S0(CommonCodeInfoVo vo) {
		if(mapper.SM0104F0S0(vo.getCoCd()) == null) {
			return true;
		} else {
			return false;
		}
	}
    
    public String SM0104F0I0(CommonCodeInfoVo vo) {
    	mapper.SM0104F0I0(vo);
    	return vo.getCoCd();
    }
    
    public boolean SM0104F0U0(CommonCodeInfoVo vo) {
    	if(mapper.SM0104F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean SM0104G0D0(CommonCodeInfoVo vo) {
    	if(mapper.SM0104G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}