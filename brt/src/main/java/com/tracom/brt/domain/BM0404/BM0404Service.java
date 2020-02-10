package com.tracom.brt.domain.BM0404;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chequer.axboot.core.parameter.RequestParams;
import com.tracom.brt.domain.BaseService;
import com.tracom.brt.domain.voice.VoiceInfoVO;
import com.tracom.brt.handler.FTPHandler;

@Service
public class BM0404Service extends BaseService<VoiceInfoVO, String> {
	@Inject
	private BM0404Mapper mapper;
	
	@Inject
	private FTPHandler handler;
	
    public List<VoiceInfoVO> BM0404G0S0(RequestParams<VoiceInfoVO> requestParams) {
        return mapper.BM0404G0S0(requestParams.getString("filter"));
    }
    
    @Transactional
    public String BM0404F0I0(VoiceInfoVO vo) {
    	mapper.BM0404F0I0(vo);
    	handler.uploadVoice(vo);
    	mapper.BM0404F0U0(vo);
    	return vo.getRoutId();
    }
    
    @Transactional
    public boolean BM0404F0U0(VoiceInfoVO vo) {
    	handler.uploadVoice(vo);
    	if(mapper.BM0404F0U0(vo) > 0) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    @Transactional
    public boolean BM0404G0D0(VoiceInfoVO vo) {
    	if(mapper.BM0404G0D0(vo) > 0) {
    		handler.deleteVoice(vo);
    		return true;
    	} else {
    		return false;
    	}
    }
}