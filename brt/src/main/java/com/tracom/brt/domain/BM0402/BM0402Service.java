package com.tracom.brt.domain.BM0402;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0402Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0402Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
    public List<VoiceInfoVO> BM0402G0S0(RequestParams<VoiceInfoVO> requestParams) {
        return mapper.BM0402G0S0(requestParams.getString("filter"));
    }
    
    @Transactional
    public String BM0402F0I0(VoiceInfoVO vo) {
    	mapper.BM0402F0I0(vo);
    	handler.uploadVoice(vo);
    	mapper.BM0402F0U0(vo);
    	return vo.getVocId();
    }
    
    public boolean BM0402F0U0(VoiceInfoVO vo) {
    	handler.uploadVoice(vo);
    	if(mapper.BM0402F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public boolean BM0402G0D0(VoiceInfoVO vo) {
    	if(mapper.BM0402G0D0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
}