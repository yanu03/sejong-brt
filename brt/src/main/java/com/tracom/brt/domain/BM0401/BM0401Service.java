package com.tracom.brt.domain.BM0401;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;

@Service
public class BM0401Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0401Mapper mapper;
	
    public List<VoiceInfoVO> BM0401G0S0(RequestParams<VoiceInfoVO> requestParams) {
        return mapper.BM0401G0S0(requestParams.getString("coCd"));
    }
    
    public String BM0401F0I0(VoiceInfoVO vo) {
    	mapper.BM0401F0I0(vo);
    	return vo.getVocId();
    }
    
    public boolean BM0401F0U0(VoiceInfoVO vo) {
    	if(mapper.BM0401F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0401G0D0(VoiceInfoVO vo) {
    	if(mapper.BM0401G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}